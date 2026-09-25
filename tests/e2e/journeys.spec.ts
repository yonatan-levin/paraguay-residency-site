import { expect, test } from "@playwright/test";

test("AC-01 selected Guided plan and catalog price survive inquiry and receipt", async ({
  page,
}) => {
  await page.goto("/en/pricing");
  const card = page.getByTestId("package-temporary-guided");
  await expect(card).toContainText("2,850");
  await card.getByRole("link", { name: /Discuss this plan/i }).click();
  await expect(page).toHaveURL(/\/en\/book\?.*plan=temporary-guided/);
  await expect(page.getByTestId("selected-package")).toContainText("Guided");
  await expect(page.getByTestId("selected-package")).toContainText("2,850");
  await expect(page.getByTestId("finder-origin")).toHaveCount(0);
  await page.getByLabel("First name", { exact: true }).fill("Preview");
  await page.getByLabel("Email", { exact: true }).fill("preview@example.test");
  await page.getByTestId("submit-request").click();
  await expect(page).toHaveURL(/\/en\/thank-you/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Demo request complete",
  );
  await expect(page.getByTestId("selected-package")).toContainText("Guided");
  await expect(page.getByTestId("selected-package")).toContainText("2,850");
  await expect(
    page.getByText(
      /No appointment has been booked and no message has been sent/,
    ),
  ).toBeVisible();
  await page.reload();
  await expect(page.getByRole("heading", { level: 1 })).not.toContainText(
    "Demo request complete",
  );
});

test("AC-06 invalid selection and direct receipt recover honestly", async ({
  page,
}) => {
  await page.goto("/en/book?plan=not-a-plan&return=https://example.com");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.getByTestId("selected-package")).not.toContainText(
    "not-a-plan",
  );
  await page.goto("/en/thank-you");
  await expect(page.getByRole("heading", { level: 1 })).not.toContainText(
    "Demo request complete",
  );
  await expect(
    page
      .getByRole("link", {
        name: /consultation|conversation|request|packages/i,
      })
      .first(),
  ).toBeVisible();
});

test("AC-10 simulated failure keeps draft and allows successful retry", async ({
  page,
}) => {
  await page.goto("/en/book?plan=temporary-essential");
  await page.getByLabel("First name", { exact: true }).fill("Preview");
  await page.getByLabel("Email", { exact: true }).fill("preview@example.test");
  await page.getByText("Preview testing options", { exact: true }).click();
  await page.getByTestId("demo-outcome").selectOption("failure");
  await page.getByTestId("submit-request").click();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    /failed|nothing|try again|could not be completed/i,
  );
  await expect(page.getByLabel("First name", { exact: true })).toHaveValue(
    "Preview",
  );
  await expect(page.getByTestId("selected-package")).toContainText("Essential");
  await page.getByTestId("demo-outcome").selectOption("success");
  await page.getByTestId("submit-request").click();
  await expect(page).toHaveURL(/\/en\/thank-you/);
});

test("AC-12 WhatsApp is an accessible local preview and makes no provider requests", async ({
  page,
  baseURL,
}) => {
  const siteOrigin = new URL(baseURL!).origin;
  const external: string[] = [];
  page.on("request", (request) => {
    if (new URL(request.url()).origin !== siteOrigin)
      external.push(request.url());
  });
  await page.goto("/en/contact?plan=temporary-guided");
  await page
    .getByRole("button", { name: /WhatsApp/i })
    .first()
    .click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toContainText("Sending is disabled in this preview");
  await expect(dialog).toContainText("Guided");
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  expect(external).toEqual([]);
});

test("AC-09/10 demo appointment retains UTC selection across zones and recovers from unavailable time", async ({
  page,
}) => {
  await page.goto("/en/book?plan=temporary-concierge");
  await page
    .getByRole("radio", { name: "Choose a demo time", exact: true })
    .check();
  const firstSlot = page.locator('input[name="slotUtc"]').first();
  await expect(firstSlot).toBeVisible();
  await firstSlot.check();
  const before = await firstSlot.locator("..").innerText();
  await page
    .getByLabel("Your time zone", { exact: true })
    .selectOption("Asia/Jerusalem");
  await expect(firstSlot).toBeChecked();
  await expect(
    page.getByText("Asia/Jerusalem", { exact: true }).last(),
  ).toBeVisible();
  // The exact UTC arithmetic is tested with an injected clock in the unit suite.
  expect(await firstSlot.locator("..").innerText()).not.toBe(before);
  await page.getByLabel("First name", { exact: true }).fill("Preview");
  await page.getByLabel("Email", { exact: true }).fill("preview@example.test");
  await page.getByText("Preview testing options", { exact: true }).click();
  await page.getByTestId("demo-outcome").selectOption("unavailable");
  await page.getByTestId("submit-request").click();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    /unavailable/i,
  );
  await expect(page.getByLabel("Email", { exact: true })).toHaveValue(
    "preview@example.test",
  );
  await page.getByTestId("demo-outcome").selectOption("success");
  await page.getByTestId("submit-request").click();
  await expect(page).toHaveURL(/\/en\/thank-you/);
  await expect(page.getByTestId("selected-package")).toContainText(
    "Simulated appointment",
  );
  await expect(page.getByTestId("selected-package")).toContainText(
    "Asia/Jerusalem",
  );
  await expect(page.getByTestId("selected-package")).toContainText("Concierge");
});

test("Spanish validation and WhatsApp callback require only the chosen channel", async ({
  page,
}) => {
  await page.goto("/es/book?plan=temporary-essential");
  await page.getByTestId("submit-request").click();
  await expect(page.locator("form").getByRole("alert")).toContainText(
    "Revise el formulario",
  );
  await page.getByLabel("Nombre", { exact: true }).fill("Prueba");
  await page
    .getByLabel("Medio de contacto preferido", { exact: true })
    .selectOption("whatsapp");
  await expect(
    page.getByLabel("Correo electrónico", { exact: true }),
  ).toHaveCount(0);
  await page
    .getByLabel("Número de teléfono con prefijo internacional", { exact: true })
    .fill("+595 981 000000");
  await page.getByTestId("submit-request").click();
  await expect(page).toHaveURL(/\/es\/thank-you/);
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Consulta de demostración completada",
  );
});

test("changing pricing journey clears an incompatible selected package", async ({
  page,
}) => {
  await page.goto("/en/pricing?plan=temporary-guided");
  await page
    .getByRole("radio", { name: "Permanent residency upgrade", exact: true })
    .check();
  await expect(page.getByTestId("package-upgrade-basic")).toBeVisible();
  await page
    .getByRole("link", { name: "Talk through your options", exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/book/);
  expect(new URL(page.url()).searchParams.get("plan")).not.toBe(
    "temporary-guided",
  );
  await expect(page.getByTestId("selected-package")).toContainText(
    /Permanent|upgrade/i,
  );
  await expect(page.getByTestId("selected-package")).not.toContainText(
    "Guided",
  );
});
