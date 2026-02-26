// @ts-check
const { test, expect } = require("@playwright/test");

const BASE = "http://localhost:3000";

test.describe("Portfolio – smoke audit", () => {
  test("homepage loads with correct title", async ({ page }) => {
    await page.goto(BASE, { waitUntil: "networkidle" });
    await expect(page).toHaveTitle(/Eckysaroyd/i);
  });

  test("all 4 nav links are present in header", async ({ page }) => {
    await page.goto(BASE, { waitUntil: "domcontentloaded" });
    // Header nav has: Projects, Skills, Experience, Contact (no "About" — logo links to #hero)
    const navLabels = ["Projects", "Skills", "Experience", "Contact"];
    for (const label of navLabels) {
      await expect(page.getByRole("link", { name: label }).first()).toBeVisible();
    }
  });

  test("Hero section renders name and CTA buttons", async ({ page }) => {
    await page.goto(BASE, { waitUntil: "domcontentloaded" });
    await expect(page.getByText("Eckysaroyd Nyato").first()).toBeVisible();
    await expect(page.getByRole("link", { name: /view my work/i }).first()).toBeVisible();
  });

  test("Projects section – Shaun Racing card is present", async ({ page }) => {
    await page.goto(BASE, { waitUntil: "networkidle" });
    // Scroll directly to #projects instead of clicking nav (avoids image intercept)
    await page.evaluate(() => {
      const el = document.querySelector("#projects");
      if (el) el.scrollIntoView({ behavior: "instant" });
    });
    await expect(page.getByText("Shaun Racing").first()).toBeVisible();
  });

  test("Projects section – Niccian Group has updated link", async ({ page }) => {
    await page.goto(BASE, { waitUntil: "networkidle" });
    const niccianLink = page.locator('a[href="https://nicciangroup.co.tz/"]').first();
    await expect(niccianLink).toBeAttached();
  });

  test("Projects section – WoW Laundry has updated link", async ({ page }) => {
    await page.goto(BASE, { waitUntil: "networkidle" });
    const wowLink = page.locator('a[href="https://wowlaundry.in/"]').first();
    await expect(wowLink).toBeAttached();
  });

  test("Skills section – Phaser 3 and Vite chips render", async ({ page }) => {
    await page.goto(BASE, { waitUntil: "networkidle" });
    await expect(page.getByText("Phaser 3").first()).toBeVisible();
    await expect(page.getByText("Vite").first()).toBeVisible();
  });

  test("Contact section is reachable", async ({ page }) => {
    await page.goto(BASE, { waitUntil: "domcontentloaded" });
    await expect(page.locator("#contact").first()).toBeAttached();
  });

  test("No runtime JS errors on load (404s on _next/static are dev-mode artifacts)", async ({ page }) => {
    const errors = [];
    page.on("pageerror", (err) => errors.push(err.message));
    await page.goto(BASE, { waitUntil: "networkidle" });
    if (errors.length > 0) console.log("Page JS errors:", errors);
    expect(errors).toHaveLength(0);
  });
});
