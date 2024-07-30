document.addEventListener('DOMContentLoaded', () => {
	const navLinks = document.querySelectorAll('nav ul li a')

	navLinks.forEach(link => {
		link.addEventListener('click', e => {
			e.preventDefault()
			const targetId = e.target.getAttribute('href').substring(1)
			const targetSection = document.getElementById(targetId)
			targetSection.scrollIntoView({
				behavior: 'smooth',
			})
		})
	})

	fetch('code.txt')
		.then(response => response.text())
		.then(data => {
			const codeContainer = document.getElementById('code-container')
			codeContainer.textContent = data
			animateCode()
		})
		.catch(error => console.error('Error fetching code.txt:', error))

	function animateCode() {
		const codeText = document.querySelector('.code-text')
		const words = codeText.textContent.match(/\S+\s*/g)

		codeText.innerHTML = ''
		words.forEach(word => {
			const span = document.createElement('span')
			span.textContent = word
			codeText.appendChild(span)
		})

		const spans = document.querySelectorAll('.code-text span')

		function highlightRandomSpans() {
			const numberOfHighlights = Math.floor(spans.length * 0.1)
			const highlightedIndexes = new Set()

			while (highlightedIndexes.size < numberOfHighlights) {
				const randomIndex = Math.floor(Math.random() * spans.length)
				highlightedIndexes.add(randomIndex)
			}

			highlightedIndexes.forEach(index => {
				spans[index].classList.add('highlight')
				setTimeout(() => {
					spans[index].classList.remove('highlight')
				}, 5000)
			})
		}

		setInterval(highlightRandomSpans, 1000)
	}

	const sections = document.querySelectorAll('section')
	const observer = new IntersectionObserver(
		entries => {
			entries.forEach(entry => {
				if (entry.isIntersecting) {
					entry.target.classList.add('visible')
				}
			})
		},
		{
			threshold: 0.1,
		}
	)

	sections.forEach(section => {
		observer.observe(section)
	})

	// Initialize text animation for hero section
	$('.intro').addClass('go')
	$('.reload').click(function () {
		$('.intro')
			.removeClass('go')
			.delay(200)
			.queue(function (next) {
				$('.intro').addClass('go')
				next()
			})
	})

	// Typed.js initialization
	new Typed('#typed', {
		strings: ['Full-Stack Developer.', 'DevOps Engineer.', 'Generalist.'],
		typeSpeed: 30,
		backSpeed: 30,
		backDelay: 1300,
		startDelay: 500,
		loop: true,
	})

	// Tab switching functionality
	const tabButtons = document.querySelectorAll('.tab-button')
	const tabContents = document.querySelectorAll('.tab-content')

	tabButtons.forEach(button => {
		button.addEventListener('click', () => {
			const tab = button.getAttribute('data-tab')

			tabButtons.forEach(btn => btn.classList.remove('active'))
			tabContents.forEach(content => content.classList.remove('active'))

			button.classList.add('active')
			const activeTab = document.getElementById(tab)

			// Fade out all tab contents
			tabContents.forEach(content => {
				content.style.opacity = 0
				content.style.transform = 'translateY(20px)'
			})

			// After a delay, make the selected tab content visible
			setTimeout(() => {
				tabContents.forEach(content => {
					content.style.display = 'none'
				})
				activeTab.style.display = 'block'
				activeTab.style.opacity = 1
				activeTab.style.transform = 'translateY(0)'
			}, 300)

			// Анимация появления карточек
			const skillCards = document.querySelectorAll(`#${tab} .skill-card`)
			skillCards.forEach((card, index) => {
				card.classList.remove('visible')
				setTimeout(() => {
					card.classList.add('visible')
				}, index * 100)
			})
		})
	})

	// Initialize the default tab
	tabButtons[0].click()

	// Carousel functionality
	const prevButton = document.querySelector('.carousel-button.prev')
	const nextButton = document.querySelector('.carousel-button.next')
	const projectsContainer = document.querySelector('.projects-container')
	const projects = document.querySelectorAll('.project-card')

	let currentIndex = 0

	function updateCarousel() {
		const cardWidth = projects[0].offsetWidth + 20 // Including margin
		const offset = -currentIndex * cardWidth
		projectsContainer.style.transform = `translateX(${offset}px)`
	}

	prevButton.addEventListener('click', () => {
		if (currentIndex > 0) {
			currentIndex--
			updateCarousel()
		}
	})

	nextButton.addEventListener('click', () => {
		if (currentIndex < projects.length - 1) {
			currentIndex++
			updateCarousel()
		}
	})

	// Initialize the carousel
	updateCarousel()
})
