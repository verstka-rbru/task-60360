// Генерируем блок "Содержание статьи"
let pageNavigation = function () {
	const elHeaders = document.querySelectorAll(".zserviceDetail__text h2");
	const sticky = document.querySelector(".sticky");

	const tpl =
		'<section class="page-navigation"><p class="page-navigation__title">Содержание статьи</p><ul class="page-navigation__list">{{contents}}</ul></section>';
	let contents = "";

	if (elHeaders && sticky) {
		elHeaders.forEach((el, index) => {
			if (!el.id) {
				el.id = `id-${index}`;
			}
			const url = `${location.href.split("#")[0]}#${el.id}`;
			contents += `<li><a href="${url}">${el.textContent}</a></li>`;
		});
		sticky.insertAdjacentHTML(
			"beforeend",
			tpl.replace("{{contents}}", contents)
		);
	}

	// Активные пункты блока "Содержание статьи"
	window.addEventListener("scroll", () => {
		const scrollTop = window.scrollY || document.documentElement.scrollTop;
		let headerId = "";
		for (let i = elHeaders.length - 1; i >= 0; i--) {
			if (
				elHeaders[i].getBoundingClientRect().top +
					window.scrollY -
					200 <
				scrollTop
			) {
				headerId = elHeaders[i].id;
				break;
			}
		}
		document
			.querySelectorAll(".page-navigation__list li.active")
			.forEach((el) => {
				el.classList.remove("active");
			});
		if (headerId) {
			document
				.querySelector(`a[href$="#${headerId}"]`)
				.parentElement.classList.add("active");
		}
	});
};

pageNavigation();

// Функция для перемещения элемента в другой элемент. Параметры:  что перемещаем, куда перемещаем, способ перемещения
let movingConstructor = function (block, to, metod) {
	if (!(document.querySelector(block) && document.querySelector(to))) {
		return;
	} else {
		switch (metod) {
			case "prepend":
				document
					.querySelector(to)
					.prepend(document.querySelector(block));
				break;

			case "before":
				document
					.querySelector(to)
					.before(document.querySelector(block));
				break;

			case "after":
				document.querySelector(to).after(document.querySelector(block));
				break;

			default:
				document
					.querySelector(to)
					.append(document.querySelector(block));
				break;
		}
	}
};

// функция будет перемещать блок в указанное место при определенной ширине экрана, иначе возвращать на место
let moving = function () {
	const windowWidth = window.innerWidth; // ширина экрана

	if (windowWidth <= 992) {
		movingConstructor(
			".page-navigation",
			".zserviceDetail__text",
			"before"
		);
	} else {
		movingConstructor(".page-navigation", ".sticky");
	}
};

moving();
window.addEventListener("resize", moving);

if (document.querySelector(".recommended-slider")) {
	let recommendedSlider = new Swiper(".recommended-slider", {
		slidesPerView: 1.1,
		spaceBetween: 10,
		loop: true,
		pagination: {
			el: ".recom-arr-pagination",
			clickable: true,
		},
		navigation: {
			nextEl: ".recom-arr__item.next",
			prevEl: ".recom-arr__item.prev",
		},
		breakpoints: {
			440: {
				slidesPerView: 1.8,
			},
			500: {
				slidesPerView: 2.1,
			},
			800: {
				slidesPerView: 2.6,
			},
		},
	});
}
