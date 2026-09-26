import { expect, test } from "@playwright/test";

test("AC-02 family campaign reaches editable family finder without contact gate", async ({
  page,
}) => {
  await page.goto("/en/lp/family-relocation");
  await page
    .getByRole("link", { name: /Plan our move/i })
    .first()
    .click();
  await expect(page).toHaveURL(/find-my-plan.*campaign=family-relocation/);
  await expect(page.getByText(/family/i).first()).toBeVisible();
  await expect(page.getByLabel("Email", { exact: true })).toHaveCount(0);
});

test("AC-03 existing temporary resident receives upgrade path", async ({
  page,
}) => {
  await page.goto("/en/find-my-plan");
  await page
    .getByRole("radio", { name: /First residency|Residency assistance/i })
    .check();
  await page.getByTestId("finder-next").click();
  await page.getByRole("radio", { name: /temporary resident/i }).check();
  await page.getByTestId("finder-next").click();
  await page.getByRole("radio", { name: /^Just me/i }).check();
  await page.getByTestId("finder-next").click();
  await page.getByRole("radio", { name: /exploring/i }).check();
  await page.getByTestId("finder-next").click();
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    /starting point/i,
  );
  await expect(page.getByTestId("finder-result")).toContainText(/upgrade/i);
  await expect(page.getByTestId("finder-result")).not.toContainText(
    "Essential",
  );
  await expect(page.getByLabel("Email", { exact: true })).toHaveCount(0);
});

test("AC-04 business goal skips residency stage and routes to business inquiry", async ({
  page,
}) => {
  await page.goto("/en/find-my-plan");
  await page.getByRole("radio", { name: /Business setup/i }).check();
  await page.getByTestId("finder-next").click();
  await expect(
    page.getByRole("radio", { name: /temporary resident/i }),
  ).toHaveCount(0);
  await page.getByRole("radio", { name: /^Just me/i }).check();
  await page.getByTestId("finder-next").click();
  await page.getByRole("radio", { name: /exploring/i }).check();
  await page.getByTestId("finder-next").click();
  await expect(page.getByTestId("finder-result")).toContainText(
    /business|company/i,
  );
  await page
    .getByTestId("finder-result")
    .getByRole("link", { name: /Discuss/i })
    .click();
  await expect(page).toHaveURL(/\/en\/book\?.*service=/);
});

test("AC-05 changing a deep-linked goal clears incompatible plan before skipping", async ({
  page,
}) => {
  await page.goto("/en/find-my-plan?plan=temporary-concierge");
  await page.getByRole("radio", { name: /Business setup/i }).check();
  await page
    .getByRole("link", { name: "Skip to booking", exact: true })
    .click();
  await expect(page).toHaveURL(/\/en\/book/);
  expect(new URL(page.url()).searchParams.get("plan")).not.toBe(
    "temporary-concierge",
  );
  await expect(page.getByTestId("selected-package")).not.toContainText(
    "Concierge",
  );
  await expect(page.getByTestId("finder-origin")).toHaveCount(0);
});

test("AC-02/05/07 family answers survive Back and result stays quote-only through receipt", async ({
  page,
}) => {
  await page.goto("/en/find-my-plan?campaign=family-relocation");
  await expect(
    page.getByRole("radio", { name: /Residency assistance/i }),
  ).toBeChecked();
  await page.getByTestId("finder-next").click();
  await page.getByRole("radio", { name: /first residency/i }).check();
  await page.getByTestId("finder-next").click();
  await expect(page.getByRole("radio", { name: /My family/i })).toBeChecked();
  await page.getByTestId("finder-next").click();
  await page.getByTestId("finder-back").click();
  await expect(page.getByRole("radio", { name: /My family/i })).toBeChecked();
  await page.getByTestId("finder-next").click();
  await page.getByRole("radio", { name: /exploring/i }).check();
  await page.getByTestId("finder-next").click();
  await page.getByRole("radio", { name: /Guided/i }).check();
  await page.getByTestId("finder-next").click();
  await expect(page.getByTestId("finder-result")).toContainText(
    "Request a family quote",
  );
  await expect(page.getByTestId("finder-result")).not.toContainText("2,850");
  await page
    .getByTestId("finder-result")
    .getByRole("link", { name: "Discuss this plan", exact: true })
    .click();
  await expect(page.getByTestId("selected-package")).toContainText(
    "Request a family quote",
  );
  await expect(page.getByTestId("finder-origin")).toContainText(
    "Recommended by your plan finder",
  );
  await page.getByLabel("First name", { exact: true }).fill("Preview");
  await page.getByLabel("Email", { exact: true }).fill("preview@example.test");
  await page.getByTestId("submit-request").click();
  await expect(page).toHaveURL(/\/en\/thank-you/);
  await expect(page.getByTestId("selected-package")).toContainText(
    "Request a family quote",
  );
  await expect(page.getByTestId("selected-package")).not.toContainText("2,850");
  await expect(page.getByTestId("finder-origin")).toContainText(
    "Recommended by your plan finder",
  );
});

test("AC-17 language switch preserves a non-campaign family quote and in-memory draft", async ({
  page,
}) => {
  await page.goto("/en/find-my-plan");
  for (const answer of [
    /^Residency assistance/,
    /^This would be my first residency/,
    /^My family/,
    /^I am just exploring/,
    /^Guided/,
  ]) {
    await page.getByRole("radio", { name: answer }).check();
    await page.getByTestId("finder-next").click();
  }
  await page
    .getByTestId("finder-result")
    .getByRole("link", { name: "Discuss this plan", exact: true })
    .click();
  await expect(page.getByTestId("selected-package")).toContainText(
    "Request a family quote",
  );
  await page.getByLabel("First name", { exact: true }).fill("Preview");
  await page.locator(".language-switcher summary").click();
  await page.getByRole("link", { name: "Español", exact: true }).click();
  await expect(page.locator("html")).toHaveAttribute("lang", "es");
  await expect(page.getByTestId("selected-package")).toContainText(
    "Solicitar presupuesto familiar",
  );
  await expect(page.getByLabel("Nombre", { exact: true })).toHaveValue(
    "Preview",
  );
});
