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
    const normalize = (value) =>
  value
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

const option = [...(select?.options || [])].find(
  (item) => normalize(item.textContent) === normalize(name),
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


/*GALERIA DE IMPLEMENTOS*/

document.addEventListener("DOMContentLoaded", () => {

    const gallery = document.querySelector("#gallery-modal");

    if (!gallery) {
        console.warn("Modal da galeria não encontrado no HTML.");
        return;
    }

    // ELEMENTOS DO MODAL

    const galleryImage = document.querySelector("#gallery-main-image");
    const galleryTitle = document.querySelector("#gallery-title");
    const galleryDescription = document.querySelector("#gallery-description");
    const galleryCategory = document.querySelector("#gallery-category");

    const galleryCounter = document.querySelector("#gallery-counter");
    const galleryProgress = document.querySelector("#gallery-progress");
    const galleryThumbnails = document.querySelector("#gallery-thumbnails");

    const gallerySpecifications = document.querySelector("#gallery-specifications");

    const galleryManual = document.querySelector("#gallery-manual");
    const galleryManualView = document.querySelector("#gallery-manual-view");
    const galleryManualDownload = document.querySelector("#gallery-manual-download");

    const closeButton = gallery.querySelector(".gallery-close");
    const nextButton = gallery.querySelector(".gallery-next");
    const prevButton = gallery.querySelector(".gallery-previous");
    const backdrop = gallery.querySelector(".gallery-backdrop");

    const contactButton = document.querySelector("#gallery-contact");
    const productSelect = document.querySelector("#product");



    if (
        !galleryImage ||
        !galleryTitle ||
        !galleryDescription ||
        !galleryCategory ||
        !galleryCounter ||
        !galleryProgress ||
        !galleryThumbnails ||
        !gallerySpecifications
    ) {
        console.error("Um ou mais elementos da galeria não foram encontrados no HTML.");
        return;
    }

    let currentImages = [];
    let currentIndex = 0;
    let previousFocus = null;
    let selectedProduct = null;

    // CADASTRO DOS IMPLEMENTOS

    const productGalleries = {

        basculante: {
            title: "Basculante",
            category: "LINHA BASCULANTE",

            description:
                "Para operações que exigem agilidade no descarregamento de materiais a granel.",

            images: [
                "images/basculante/basculante_branco_1.png",
                "images/basculante/basculante_branco_2.png",
                "images/basculante/basculante_branco_3.png",
                "images/basculante/basculante_cinza_1.png",
                "images/basculante/basculante_cinza_2.png",
                "images/basculante/basculante_cinza_3.png"
            ],

            specs: [],

            manual: "manuais/basculante.pdf"
        },

        graneleira: {
            title: "Graneleira",
            category: "LINHA CARGA SECA",

            description:
                "Solução versátil para o transporte de grãos e cargas compatíveis.",

            images: [
                "images/graneleiro/graneleiro_1.png",
                "images/graneleiro/graneleiro_2.png",
                "images/graneleiro/graneleiro_3.png",
                "images/graneleiro/graneleiro_preto_1.png",
                "images/graneleiro/graneleiro_preto_2.png"
            ],

            specs: [],

            manual: "manuais/graneleira.pdf"
        },

        tanque: {
            title: "Tanque",
            category: "LINHA ESPECIAL",

            description:
                "Alternativa para operações de transporte de líquidos conforme especificação.",

            images: [
                "images/tanque/tanque_1.png",
                "images/tanque/tanque_2.png",
                "images/tanque/tanque_3.png",
                "images/tanque/tanque_4.png"
            ],

            specs: [],

            manual: "manuais/tanque.pdf"
        },

        furgao_lonado: {
            title: "Furgão Lonado",
            category: "LINHA CARGA SECA",

            description:
                "Proteção da carga com praticidade para carga e descarga lateral.",

            images: [
                "images/furgao_lonado/furgao_lonado_1.png",
                "images/furgao_lonado/furgao_lonado_2.png",
                "images/furgao_lonado/furgao_lonado_3.png",
                "images/furgao_lonado/furgao_lonado_4.png"
            ],

            specs: [],

            manual: "manuais/furgao_lonado.pdf"
        },

        furgao_aluminio: {
            title: "Furgão Alumínio",
            category: "LINHA CARGA SECA",

            description:
                "Estrutura fechada para mercadorias que precisam de proteção.",

            images: [
                "images/furgao_aluminio/furgao_aluminio_1.png",
                "images/furgao_aluminio/furgao_aluminio_2.png",
                "images/furgao_aluminio/furgao_aluminio_3.png",
                "images/furgao_aluminio/furgao_aluminio_4.png"
            ],

            specs: [],

            manual: "manuais/furgao_aluminio.pdf"
        },

        porta_conteiner: {
            title: "Porta Contêiner",
            category: "LINHA ESPECIAL",

            description:
                "Implemento destinado ao transporte de contêineres.",

            images: [
                "images/porta_conteiner/porta_conteiner_1.png",
                "images/porta_conteiner/porta_conteiner_2.png",
                "images/porta_conteiner/porta_conteiner_3.png",
                "images/porta_conteiner/porta_conteiner_4.png"
            ],

            specs: [],

            manual: "manuais/porta_conteiner.pdf"
        },

        carrega_tudo: {
            title: "Carrega Tudo",
            category: "LINHA ESPECIAL",

            description:
                "Equipamento direcionado ao transporte de cargas especiais.",

            images: [
                "images/carrega_tudo/carrega_tudo_1.png",
                "images/carrega_tudo/carrega_tudo_2.png",
                "images/carrega_tudo/carrega_tudo_3.png"
            ],

            specs: [],

            manual: "manuais/carrega_tudo.pdf"
        },

        florestal: {
            title: "Florestal",
            category: "LINHA ESPECIAL",

            description:
                "Aplicação voltada ao transporte de madeira e operações florestais.",

            images: [
                "images/florestal/florestal_1.png",
                "images/florestal/florestal_2.png",
                "images/florestal/florestal_3.png",
                "images/florestal/florestal_4.png"
            ],

            specs: [],

            manual: "manuais/florestal.pdf"
        }

    };


    // NORMALIZAR NOMES

    function normalizeName(value) {

        return String(value)
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/[^a-z0-9]/g, "");

    }


    // ATUALIZAR IMAGEM

    function renderGallery() {

        const image = currentImages[currentIndex];

        galleryImage.src = image;

        galleryImage.alt =
            `${selectedProduct.title} - Foto ${currentIndex + 1}`;

        galleryCounter.textContent =
            `${currentIndex + 1} / ${currentImages.length}`;

        galleryProgress.style.width =
            `${((currentIndex + 1) / currentImages.length) * 100}%`;

        galleryThumbnails.querySelectorAll("button").forEach((button, index) => {

            const active = index === currentIndex;

            button.classList.toggle("is-active", active);

            button.setAttribute("aria-pressed", String(active));

        });

    }


    // CRIAR MINIATURAS

    function renderThumbnails() {

        galleryThumbnails.innerHTML = "";

        currentImages.forEach((image, index) => {

            const button = document.createElement("button");

            button.type = "button";
            button.className = "gallery-thumbnail";

            button.setAttribute("aria-label", `Visualizar foto ${index + 1}`);
            button.setAttribute("aria-pressed", "false");

            const thumbnail = document.createElement("img");

            thumbnail.src = image;
            thumbnail.alt = "";

            button.appendChild(thumbnail);

            button.addEventListener("click", () => {

                currentIndex = index;

                renderGallery();

            });

            galleryThumbnails.appendChild(button);

        });

    }


    // CARREGAR ESPECIFICAÇÕES

    function renderSpecifications(specs) {

        gallerySpecifications.innerHTML = "";

        if (!specs || specs.length === 0) {

            gallerySpecifications.innerHTML = `
                <p class="gallery-empty">
                    Consulte nossa equipe para informações técnicas.
                </p>
            `;

            return;

        }

        specs.forEach(spec => {

            const item = document.createElement("div");

            item.className = "gallery-spec-item";

            const label = document.createElement("span");
            label.textContent = spec.label;

            const value = document.createElement("strong");
            value.textContent = spec.value;

            item.append(label, value);

            gallerySpecifications.appendChild(item);

        });

    }


    // CARREGAR MANUAL PDF

    function renderManual(manualPath) {

        if (!manualPath || !galleryManual || !galleryManualView || !galleryManualDownload) {

            if (galleryManual) {
                galleryManual.hidden = true;
            }

            return;

        }

        galleryManual.hidden = false;

        galleryManualView.href = manualPath;
        galleryManualDownload.href = manualPath;

    }


    // ABRIR MODAL

    function openGallery(productKey) {

        const product = productGalleries[productKey];

        if (!product) {

            console.warn("Implemento não encontrado:", productKey);

            return;

        }

        console.log("Abrindo galeria:", product.title);

        selectedProduct = product;

        currentImages = product.images;
        currentIndex = 0;

        previousFocus = document.activeElement;

        galleryTitle.textContent = product.title;

        galleryDescription.textContent = product.description;

        galleryCategory.textContent = product.category;

        renderSpecifications(product.specs);

        renderManual(product.manual);

        renderThumbnails();

        renderGallery();

        gallery.hidden = false;

        gallery.classList.add("active");

        gallery.setAttribute("aria-hidden", "false");

        document.body.style.overflow = "hidden";

        closeButton?.focus();

    }


    // FECHAR MODAL

    function closeGallery() {

        gallery.classList.remove("active");

        gallery.hidden = true;

        gallery.setAttribute("aria-hidden", "true");

        document.body.style.overflow = "";

        if (previousFocus) {
            previousFocus.focus();
        }

    }


    // PRÓXIMA FOTO

    function nextImage() {

        if (!currentImages.length) return;

        currentIndex =
            (currentIndex + 1) % currentImages.length;

        renderGallery();

    }


    // FOTO ANTERIOR

    function previousImage() {

        if (!currentImages.length) return;

        currentIndex =
            (currentIndex - 1 + currentImages.length) % currentImages.length;

        renderGallery();

    }


    // SELECIONAR PRODUTO PARA ORÇAMENTO

    contactButton?.addEventListener("click", () => {

        if (!selectedProduct || !productSelect) return;

        const option = [...productSelect.options].find(item => {

            return normalizeName(item.textContent) ===
                normalizeName(selectedProduct.title);

        });

        if (option) {

            productSelect.value = option.value || option.textContent;

        }

        closeGallery();

        document.querySelector("#orcamento")?.scrollIntoView({
            behavior: "smooth"
        });

        document.querySelector("#name")?.focus({
            preventScroll: true
        });

    });


    // CLIQUE NOS CARDS

    document.querySelectorAll(".product-card[data-gallery]").forEach(card => {

        card.addEventListener("click", event => {

            if (event.target.closest("a, button")) return;

            console.log("Produto clicado:", card.dataset.gallery);

            openGallery(card.dataset.gallery);

        });

    });


    // CONTROLES

    closeButton?.addEventListener("click", closeGallery);

    nextButton?.addEventListener("click", nextImage);

    prevButton?.addEventListener("click", previousImage);

    backdrop?.addEventListener("click", closeGallery);


    // TECLADO

    document.addEventListener("keydown", event => {

        if (gallery.hidden) return;

        if (event.key === "Escape") {

            closeGallery();

        }

        if (event.key === "ArrowRight") {

            nextImage();

        }

        if (event.key === "ArrowLeft") {

            previousImage();

        }

    });

    console.log("Galeria de implementos carregada com sucesso.");

});