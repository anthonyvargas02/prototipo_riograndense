document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".menu-toggle");
  const nav = document.querySelector("#nav");
  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      const open = nav.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(open));
      toggle.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");
    });
    nav.querySelectorAll("a").forEach((link) =>
      link.addEventListener("click", () => {
        nav.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
        toggle.setAttribute("aria-label", "Abrir menu");
      }),
    );
  }

  const search = document.querySelector("#product-search");
  const cards = [...document.querySelectorAll(".product-card")];
  const filters = [...document.querySelectorAll("[data-filter]")];
  const empty = document.querySelector("#empty-state");
  let category = "todos";

  function filterProducts() {
    const q = (search?.value || "").trim().toLocaleLowerCase("pt-BR");
    let shown = 0;
    cards.forEach((card) => {
      const matchesText =
        !q || card.textContent.toLocaleLowerCase("pt-BR").includes(q);
      const matchesCategory =
        category === "todos" || card.dataset.category === category;
      const visible = matchesText && matchesCategory;
      card.hidden = !visible;
      if (visible) shown++;
    });
    if (empty) empty.hidden = shown > 0;
  }
  search?.addEventListener("input", filterProducts);
  filters.forEach((button) =>
    button.addEventListener("click", () => {
      category = button.dataset.filter || "todos";
      filters.forEach((item) => {
        const active = item === button;
        item.classList.toggle("is-active", active);
        item.setAttribute("aria-pressed", String(active));
      });
      filterProducts();
    }),
  );

  const select = document.querySelector("#product");
  document.querySelectorAll("[data-product]").forEach((button) =>
    button.addEventListener("click", () => {
      const name = button.dataset.product;
      const option = [...(select?.options || [])].find(
        (item) =>
          item.text.trim().toLocaleLowerCase("pt-BR") ===
          name.toLocaleLowerCase("pt-BR"),
      );
      if (option && select) select.value = option.value || option.text;
      document
        .querySelector("#orcamento")
        ?.scrollIntoView({ behavior: "smooth" });
      document.querySelector("#name")?.focus({ preventScroll: true });
    }),
  );

  document.querySelector("#quote-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const lines = [
      "Olá! Gostaria de solicitar um orçamento.",
      "",
      `Nome: ${data.get("name")}`,
      `Telefone: ${data.get("phone")}`,
      `Cidade: ${data.get("cidade")}`,
      `Implemento de interesse: ${data.get("product")}`,
    ];
    const details = String(data.get("message") || "").trim();
    if (details) lines.push(`Detalhes: ${details}`);
    window.open(
      `https://wa.me/5551998803852?text=${encodeURIComponent(lines.join("\n"))}`,
      "_blank",
      "noopener,noreferrer",
    );
  });
  const year = document.querySelector("#year");
  if (year) year.textContent = new Date().getFullYear();
});
