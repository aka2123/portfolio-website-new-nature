const nav = document.querySelector('.nav')
const navItems = document.querySelectorAll('.nav a, .nav button')
const hamburgerBtn = document.querySelector('.hamburger')
const darkElementsForHamburgerBtn = document.querySelectorAll('.dark-element-where-hamburger-btn-changes-to-white')

const sectionAchievements = document.querySelector('.achievements')
const achievementsNumbers = document.querySelectorAll('.achievements__number')

const sectionOffersInHomePage = document.querySelector('.home-page .offers')
const offersCards = document.querySelectorAll('.offers__card')
const offersChooseBarBtns = document.querySelectorAll('.offers__choose-bar-btn')
const offersCardsOnlyInOffersPage = document.querySelectorAll('.offers-page .offers__card')
const offersPage = document.querySelector('.offers-page')

const accordionsBtns = document.querySelectorAll('.accordion-btn')
const sectionsWhereNavChangesItsStyle = document.querySelectorAll('.section-where-nav-style-changes')

const mediaQueryFor922pxAndUp = window.matchMedia('(min-width: 992px)')
const mediaQueryNarrowerThan992px = window.matchMedia('(max-width: 992px)')
const mediaQueryNarrowerThan576px = window.matchMedia('(max-width: 576px)')

const testimonialsSection = document.querySelector('.testimonials')
const testimonials = document.querySelectorAll('.testimonials__testimonial')
const testimonialArrowLeft = document.querySelector('.testimonials__arrow--left')
const testimonialArrowRight = document.querySelector('.testimonials__arrow--right')

const btnNewsletterForm = document.querySelector('.newsletter__btn.btn-for-inputs')
const inputForEmailInNewsletterForm = document.querySelector('.newsletter__input')

const btnContactForm = document.querySelector('.contact__form-btn.btn-for-inputs')
const inputsAndTextareaInContactForm = document.querySelectorAll('.contact .input-default, .contact .textarea-default')
const inputForEmailInContactForm = document.querySelector('.contact .input-email')
const inputForNameInContactForm = document.querySelector('.contact .input-name')
const inputForSurnameInContactForm = document.querySelector('.contact .input-surname')
const inputForPhoneNumberInContactForm = document.querySelector('.contact .input-phone-number')
const textareaForMessageInContactForm = document.querySelector('.contact .textarea-message')

const footerYear = document.querySelector('.footer__year')

const optionsForObserver = {
	rootMargin: '-250px',
}

let indexOfCurrentCenteredTestimonial = 0
const indexOfLastTestimonial = testimonials.length - 1

let startXOfDragOnTestimonials = 0
let endXOfDragOnTestimonials = 0
let differenceOfStartEndX = 0

const handleListenersForFunctionShowHideNav = e => {
	navItems.forEach(item => {
		if (e.target === item) {
			showHideNavAndStyleHamburgerBtn()
		}
	})

	if (hamburgerBtn.contains(e.target)) {
		showHideNavAndStyleHamburgerBtn()
	}
	if (!nav.contains(e.target) && !hamburgerBtn.contains(e.target) && nav.classList.contains('nav--visible')) {
		showHideNavAndStyleHamburgerBtn()
	}
}

const changeColorOfHamburgerBtn = () => {
	const scrolledYDistance = window.scrollY
	const hamburgerBtnDistanceFromTopOfTheScreenToTopOfBtn = hamburgerBtn.offsetTop + scrolledYDistance
	const hamburgerBtnDistanceFromTopOfTheScreenToBottomOfBtn =
		hamburgerBtn.offsetHeight + hamburgerBtnDistanceFromTopOfTheScreenToTopOfBtn

	hamburgerBtn.classList.remove('hamburger--white-color-on-dark-background')

	for (const darkEl of darkElementsForHamburgerBtn) {
		const darkElDistanceFromTopOfTheScreenToTopOfEl = darkEl.getBoundingClientRect().top + window.scrollY
		const darkElDistanceFromTopOfTheScreenToBottomOfEl = darkEl.offsetHeight + darkElDistanceFromTopOfTheScreenToTopOfEl

		if (
			hamburgerBtnDistanceFromTopOfTheScreenToTopOfBtn + 30 > darkElDistanceFromTopOfTheScreenToTopOfEl &&
			hamburgerBtnDistanceFromTopOfTheScreenToBottomOfBtn - 30  < darkElDistanceFromTopOfTheScreenToBottomOfEl
		) {
			hamburgerBtn.classList.add('hamburger--white-color-on-dark-background')
		}
	}
	hideWhiteStyleOfHamburgerBtn()
}

const showHideNavAndStyleHamburgerBtn = () => {
	nav.classList.toggle('nav--visible')
	hamburgerBtn.classList.toggle('is-active')
	if (mediaQueryNarrowerThan576px.matches) {
		document.body.classList.toggle('unable-to-scroll')
	}
	changeColorOfHamburgerBtn()
	hideWhiteStyleOfHamburgerBtn()
}
const hideWhiteStyleOfHamburgerBtn = () => {
	if (hamburgerBtn.classList.contains('is-active')) {
		hamburgerBtn.classList.remove('hamburger--white-color-on-dark-background')
	} 
}
// achievements

const increaseNumbersInAchievementSection = entry => {
	if (entry[0].isIntersecting) {
		achievementsNumbers.forEach(num => {
			const finalNum = +num.dataset.finalNum
			const speed = finalNum / 200

			const updateNumber = () => {
				if (num.textContent < finalNum) {
					num.textContent = Math.floor(++num.textContent + speed)
					setTimeout(updateNumber, 1)
				} else {
					num.textContent = finalNum
				}
			}
			updateNumber()
		})
	}
}

const addAnimationToOffersCards = entry => {
	if (entry[0].isIntersecting) {
		offersCards.forEach(card => card.classList.add('offers__card--animated-when-first-seen'))
	}
}

function expandAccordion() {
	const allSiblingsOfClickedBtn = this.parentElement.querySelectorAll('.accordion-btn ~ *')
	allSiblingsOfClickedBtn.forEach(sibling => {
		const newClassMakingTheSiblingVisible = sibling.classList[0] + '--visible'
		sibling.classList.toggle(newClassMakingTheSiblingVisible)
	})
	const iconInClickedBtn = this.querySelector('.arrow-down-icon')
	iconInClickedBtn.classList.toggle('arrow-down-icon--rotated')
}

const checkWhichOfferBtnIsActive = () => {
	const activeOfferBtn = document.querySelector('.offers__choose-bar-btn--active')
	const representingClassOfActiveOfferBtn = activeOfferBtn.classList[1].split('--')[1]

	offersCardsOnlyInOffersPage.forEach(card => {
		const representingClassOfOffersCard = card.classList[1].split('--')[1]
		if (representingClassOfActiveOfferBtn !== representingClassOfOffersCard) {
			card.classList.add('offers__card--hidden-overriding-visible-class')
		} else {
			card.classList.remove('offers__card--hidden-overriding-visible-class')
		}
	})
}

const changeActiveBtnInOffersChooseBar = e => {
	offersChooseBarBtns.forEach(btn => {
		if (btn === e.target) {
			btn.classList.add('offers__choose-bar-btn--active')
		} else {
			btn.classList.remove('offers__choose-bar-btn--active')
		}
	})

	checkWhichOfferBtnIsActive()
}

if (mediaQueryFor922pxAndUp.matches) {
	offersCards.forEach(card => card.classList.add('offers__card--visible'))
}

const checkAtWhichSectionYouAre = () => {
	const scrolledDistance = window.scrollY
	sectionsWhereNavChangesItsStyle.forEach(section => {
		const sectionDistanceFromTop = section.offsetTop
		const sectionHeight = section.offsetHeight

		if (
			scrolledDistance >= sectionDistanceFromTop &&
			scrolledDistance <= sectionHeight + sectionDistanceFromTop &&
			!nav.classList.contains('nav--on-special-sections')
		) {
			nav.classList.add('nav--on-special-sections')
			nav.classList.remove('nav--animated')
			if (section.classList.contains('light-section') || section.classList.contains('light-secondary-section')) {
				nav.classList.add('nav--on-special-sections-which-are-light')
			} else {
				nav.classList.add('nav--on-special-sections-which-are-dark')
			}
		} else if (scrolledDistance < sectionDistanceFromTop || scrolledDistance > sectionHeight + sectionDistanceFromTop) {
			nav.classList.remove('nav--on-special-sections')
			nav.classList.remove('nav--on-special-sections-which-are-light')
			nav.classList.remove('nav--on-special-sections-which-are-dark')
			nav.classList.add('nav--animated')
		}
	})
}

const moveTestimonials = () => {
	console.log('moved testimonials')
	const exampleTestimonial = testimonials[0]
	const testimonialWidth = exampleTestimonial.offsetWidth
	const testimonialMarginValue = parseInt(window.getComputedStyle(exampleTestimonial).marginRight)
	const translateXValue = `${(testimonialWidth + testimonialMarginValue) * indexOfCurrentCenteredTestimonial}`
	const centeredTestimonial = testimonials[indexOfCurrentCenteredTestimonial]

	for (const testimonial of testimonials) {
		testimonial.classList.remove('testimonials__testimonial--at-the-center')
		testimonial.style.transform = `translateX(-${translateXValue}px)`
	}

	centeredTestimonial.classList.add('testimonials__testimonial--at-the-center')
}

const decreaseVariableIndexOfCenteredTestimonial = () => {
	if (indexOfCurrentCenteredTestimonial > 0) {
		indexOfCurrentCenteredTestimonial--
	} else if (indexOfCurrentCenteredTestimonial === 0) {
		indexOfCurrentCenteredTestimonial = indexOfLastTestimonial
	}
	moveTestimonials()
}
const increaseVariableIndexOfCenteredTestimonial = () => {
	if (indexOfCurrentCenteredTestimonial < indexOfLastTestimonial) {
		indexOfCurrentCenteredTestimonial++
	} else if (indexOfCurrentCenteredTestimonial === indexOfLastTestimonial) {
		indexOfCurrentCenteredTestimonial = 0
	}
	moveTestimonials()
}

const checkDragDirection = e => {
	differenceOfStartEndX = startXOfDragOnTestimonials - endXOfDragOnTestimonials

	if (endXOfDragOnTestimonials !== 0) {
		// Touch end is not specified when page is clicked not dragged.
		// So difference would be always not === 0, despite no drag
		if (differenceOfStartEndX > 50) {
			increaseVariableIndexOfCenteredTestimonial()
		} else if (differenceOfStartEndX < -50) {
			decreaseVariableIndexOfCenteredTestimonial()
		}
	}
	startXOfDragOnTestimonials = 0
	endXOfDragOnTestimonials = 0
}

const addErrorToInput = (input, message) => {
	const inputError = input.nextElementSibling
	inputError.classList.add('error-for-inputs-visible')
	inputError.textContent = message
}

const removeErrorFromInput = input => {
	const inputError = input.nextElementSibling
	inputError.classList.remove('error-for-inputs-visible')
	inputError.textContent = ''
}

const checkEmailSpelling = email => {
	const re = /^\S+@\S+\.\S+$/

	if (re.test(email.value)) {
		removeErrorFromInput(email)
	} else {
		addErrorToInput(email, 'Email jest błędny')
	}
}

const checkNameSpelling = name => {
	const re = /^[a-zA-Z\s]*$/

	if (!re.test(name.value)) {
		const message = `${name.previousElementSibling.textContent} nie może zawierać znaków `
		addErrorToInput(name, message)
	} else {
		removeErrorFromInput(name)
	}
}

const checkLenghtOfInput = (input, minLenghtOfChar) => {
	if (input.value.length < minLenghtOfChar) {
		const typeOfInput = input.previousElementSibling.textContent
		let message
		if (minLenghtOfChar > 4) {
			message = `${typeOfInput} ma zawierać minimalnie ${minLenghtOfChar} znaków`
		} else if (minLenghtOfChar <= 4) {
			message = `${typeOfInput} ma zawierać minimalnie ${minLenghtOfChar} znaki`
		}
		addErrorToInput(input, message)
	} else if (input.classList.contains('textarea-default')) {
		removeErrorFromInput(input)
	}
}

const checkLenghtOfInputPhoneNumber = (phoneNum, numbers) => {
	if (phoneNum.value.length !== numbers) {
		const labelTextInArray = phoneNum.previousElementSibling.textContent.split(' ')
		const firstCharOf1word = labelTextInArray[0].charAt(0).toUpperCase()
		const restOfTextOf1word = labelTextInArray[0].slice(1)
		const phoneNumString = firstCharOf1word + restOfTextOf1word + ' ' + labelTextInArray[1]
		const message = `${phoneNumString} ma zawierać ${numbers} cyfr`
		addErrorToInput(phoneNum, message)
	} else {
		removeErrorFromInput(phoneNum)
	}
}

const checkIfInputIsEmpty = input => {
	if (input.value.length === 0) {
		const typeOfInput = input.previousElementSibling.textContent
		const message = `${typeOfInput} nie może być pusty`
		addErrorToInput(input, message)
	}
}

// this function should be after other functions in handleParameters - kind of function
// as it doesn't remove error, it doesn't override previous ones
const handleInputsToCheckIfAreEmpty = inputsOrInput => {
	if (Array.isArray(inputsOrInput)) {
		inputsOrInput.forEach(input => checkIfInputIsEmpty(input))
	} else {
		checkIfInputIsEmpty(inputsOrInput)
	}
}

const showPopup = e => {
	let numOfErrors = 0
	const sectionOfClickedBtn = e.target.closest('.section')
	const popupOfThisForm = sectionOfClickedBtn.querySelector('.form-message')
	const allInputsAndTextareasOfThisForm = sectionOfClickedBtn.querySelectorAll('.input-default, .textarea-default')

	allInputsAndTextareasOfThisForm.forEach(inputOrTextarea => {
		if (inputOrTextarea.nextElementSibling.classList.contains('error-for-inputs-visible')) {
			numOfErrors++
		}
	})

	if (numOfErrors === 0) {
		popupOfThisForm.classList.add('form-message-active')
		setTimeout(() => {
			popupOfThisForm.classList.remove('form-message-active')
			allInputsAndTextareasOfThisForm.forEach(inputOrTextarea => (inputOrTextarea.value = ''))
		}, 3000)
	} else {
		popupOfThisForm.classList.remove('form-message-active')
	}
}

const handleParametersOfInputsOfContactForm = e => {
	e.preventDefault()

	checkEmailSpelling(inputForEmailInContactForm)
	checkNameSpelling(inputForNameInContactForm)
	checkNameSpelling(inputForSurnameInContactForm)
	checkLenghtOfInput(inputForNameInContactForm, 3)
	checkLenghtOfInput(inputForSurnameInContactForm, 3)
	checkLenghtOfInputPhoneNumber(inputForPhoneNumberInContactForm, 9)
	checkLenghtOfInput(textareaForMessageInContactForm, 30)
	handleInputsToCheckIfAreEmpty(inputsAndTextareaInContactForm)

	showPopup(e)
}

const handleParametersForInputOfNewsletterForm = e => {
	e.preventDefault()

	checkEmailSpelling(inputForEmailInNewsletterForm)
	handleInputsToCheckIfAreEmpty(inputForEmailInNewsletterForm)

	showPopup(e)
}

const updateFooterYear = () => {
	footerYear.textContent = new Date().getFullYear()
}
updateFooterYear()

document.addEventListener('click', handleListenersForFunctionShowHideNav)
accordionsBtns.forEach(btn => btn.addEventListener('click', expandAccordion))
const observerForAchievements = new IntersectionObserver(increaseNumbersInAchievementSection, optionsForObserver)
const observerForOffers = new IntersectionObserver(addAnimationToOffersCards, optionsForObserver)
if (sectionAchievements !== null) {
	observerForAchievements.observe(sectionAchievements)
}
if (sectionOffersInHomePage !== null) {
	observerForOffers.observe(sectionOffersInHomePage)
}
if (offersPage !== null) {
	document.addEventListener('DOMContentLoaded', checkWhichOfferBtnIsActive)
	offersChooseBarBtns.forEach(btn => btn.addEventListener('click', changeActiveBtnInOffersChooseBar))
}
if (testimonialsSection !== null) {
	testimonialsSection.addEventListener('touchstart', e => (startXOfDragOnTestimonials = e.touches[0].clientX))
	testimonialsSection.addEventListener('touchmove', e => (endXOfDragOnTestimonials = e.touches[0].clientX))
	testimonialsSection.addEventListener('touchend', checkDragDirection)
	testimonialArrowRight.addEventListener('click', increaseVariableIndexOfCenteredTestimonial)
	testimonialArrowLeft.addEventListener('click', decreaseVariableIndexOfCenteredTestimonial)
}
if (btnContactForm !== null) {
	btnContactForm.addEventListener('click', handleParametersOfInputsOfContactForm)
}
if (btnNewsletterForm !== null) {
	btnNewsletterForm.addEventListener('click', handleParametersForInputOfNewsletterForm)
}

document.addEventListener('DOMContentLoaded', checkAtWhichSectionYouAre)
document.addEventListener('scroll', checkAtWhichSectionYouAre)
if (mediaQueryNarrowerThan992px.matches) {
	document.addEventListener('scroll', changeColorOfHamburgerBtn)
}
