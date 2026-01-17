<script setup lang="ts">
// Components will be imported here
const isMenuOpen = ref(false)

const toggleMenu = () => {
    isMenuOpen.value = !isMenuOpen.value
}

const fbLink = useRuntimeConfig().public.fbLink
const telegramLink = useRuntimeConfig().public.telegramLink
const youtubeLink = useRuntimeConfig().public.youtubeLink
const igLink = useRuntimeConfig().public.igLink
const bentoLink = useRuntimeConfig().public.bentoLink
const blobBaseUrl = useRuntimeConfig().public.blobBaseUrl
const courseLink = useRuntimeConfig().public.courseLink
const showBuyCourse = useRuntimeConfig().public.showBuyCourse as unknown as boolean
const tiktokLink = useRuntimeConfig().public.tiktokLink
const privateCourseLink = useRuntimeConfig().public.privateCourseLink
const showBuyPrivateCourse = useRuntimeConfig().public.showBuyPrivateCourse as unknown as boolean

// Image modal state
const selectedImage = ref<string | null>(null)
const isModalOpen = ref(false)

const openImageModal = (imageUrl: string) => {
    selectedImage.value = imageUrl
    isModalOpen.value = true
    document.body.style.overflow = 'hidden'
}

const closeImageModal = () => {
    isModalOpen.value = false
    selectedImage.value = null
    document.body.style.overflow = ''
}

// Handle ESC key to close modal
onMounted(() => {
    const handleEscape = (e: KeyboardEvent) => {
        if (e.key === 'Escape' && isModalOpen.value) {
            closeImageModal()
        }
    }
    window.addEventListener('keydown', handleEscape)
    
    onUnmounted(() => {
        window.removeEventListener('keydown', handleEscape)
    })
})

// Course images
const courseImages = computed(() => [
    { src: `${blobBaseUrl}/images/1.%20ICT%20Core%20Concepts.png`, alt: 'ICT Core Concepts' },
    { src: `${blobBaseUrl}/images/2.%20Quarterly%20Theory%20Fundamentals.png`, alt: 'Quarterly Theory Fundamentals' },
    { src: `${blobBaseUrl}/images/3.%20Fractal%20Model.png`, alt: 'Fractal Model' },
    { src: `${blobBaseUrl}/images/2026P1-Understand The Logic of Time & Price.png`, alt: 'Understand The Logic of Time & Price P1' },
    { src: `${blobBaseUrl}/images/2026P2-Understand The Logic of Time & Price.png`, alt: 'Understand The Logic of Time & Price P2' },
])

const privateCourseImages = [
    { src: `${blobBaseUrl}/images/Mentorship.png`, alt: 'Mentorship' },
    { src: `${blobBaseUrl}/images/4.%20Large%20Range%20Model.png`, alt: 'Large Range Model' },
]
</script>

<template>
    <main class="min-h-screen text-white bg-gradient-to-b from-[#0E1314] to-black relative overflow-x-hidden">
        <div
            class="absolute top-[20%] -left-[15%] w-[500px] h-[500px] bg-[#1C1E22] rounded-full opacity-[0.15] blur-[120px] pointer-events-none">
        </div>
        <div
            class="absolute top-[20%] -right-[15%] w-[500px] h-[500px] bg-[#1C1E22] rounded-full opacity-[0.15] blur-[120px] pointer-events-none">
        </div>
        <!-- Header -->
        <header class="fixed top-0 w-full z-50 bg-black/90 backdrop-blur-sm">
            <nav class="container mx-auto px-4 py-4 flex justify-between items-center">
                <div class="flex items-center">
                    <a href="/">
                        <img src="/images/na-logo-gray.png" alt="Logo"
                            class="w-8 h-8 sm:w-12 sm:h-12 rounded-full cursor-pointer" />
                    </a>
                </div>
                <!-- Desktop Menu -->
                <div class="hidden md:flex gap-8">
                    <a href="#about" class="hover:text-[#99e18e]">About</a>
                    <a href="#systems" class="hover:text-[#99e18e]">Systems</a>
                    <a href="#free-learning" class="hover:text-[#99e18e]">Free Learning</a>
                    <a href="#course" class="hover:text-[#99e18e]">Course</a>
                    <a v-if="showBuyPrivateCourse" href="#private-course" class="hover:text-[#99e18e]">Private Course</a>
                    <!-- <a href="#certified" class="hover:text-[#99e18e]">Certified</a> -->
                    <a href="#contact" class="hover:text-[#99e18e]">Contact</a>
                </div>
                <!-- Mobile Menu Button -->
                <button @click="toggleMenu" class="md:hidden text-white focus:outline-none">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M4 6h16M4 12h16M4 18h16"></path>
                        <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </nav>
            <!-- Mobile Menu -->
            <div v-if="isMenuOpen"
                class="md:hidden bg-black/95 backdrop-blur-sm border-t border-gray-800/50 transition-all duration-300">
                <div class="container mx-auto px-4 py-4 flex flex-col gap-4">
                    <a href="#about" @click="toggleMenu" class="hover:text-[#99e18e] py-2">About</a>
                    <a href="#systems" @click="toggleMenu" class="hover:text-[#99e18e] py-2">Systems</a>
                    <a href="#free-learning" @click="toggleMenu" class="hover:text-[#99e18e] py-2">Free Learning</a>
                    <a href="#course" @click="toggleMenu" class="hover:text-[#99e18e] py-2">Course</a>
                    <a v-if="showBuyPrivateCourse" href="#private-course" @click="toggleMenu" class="hover:text-[#99e18e] py-2">Private Course</a>
                    <!-- <a href="#certified" @click="toggleMenu" class="hover:text-[#99e18e] py-2">Certified</a> -->
                    <a href="#contact" @click="toggleMenu" class="hover:text-[#99e18e] py-2">Contact</a>
                </div>
            </div>
        </header>

        <!-- Hero Section -->
        <section class="pt-24 sm:pt-32 pb-10 sm:pb-12 px-4 bg-gradient-to-b from-[#0E1314] to-[#0E1314] relative">
            <div class="container mx-auto text-center">
                <div class="flex justify-center">
                    <img src="/images/na-trades.png" alt="NA TRADES"
                        class="h-40 sm:h-48 md:h-56 lg:h-64 w-auto object-contain" />
                </div>
                <h1 class="text-4xl sm:text-5xl md:text-6xl font-bold mb-2 sm:mb-4 mt-6 sm:mt-8">NA TRADES</h1>
                <p class="text-[#99e18e] text-lg sm:text-xl md:text-2xl">ICT CONCEPT & QUARTERLY THEORY</p>
            </div>
        </section>

        <div class="w-full h-0.5 mx-auto my-10 rounded-full glow-line"></div>

        <!-- About Section -->
        <section id="about" class="py-6 sm:py-10 px-4 scroll-mt-20 sm:scroll-mt-24">
            <div class="container mx-auto text-center">
                <h2 class="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8">About</h2>
                <div class="max-w-6xl mx-auto">
                    <div
                        class="relative p-[1px] rounded-2xl bg-gradient-to-b from-gray-700/50 via-gray-900/50 to-black/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
                        <div
                            class="bg-gradient-to-b from-[#1C1E22]/80 to-black/90 p-6 sm:p-8 md:p-10 rounded-2xl backdrop-blur-sm">
                            <div class="text-base sm:text-lg opacity-90 space-y-4 text-left">
                                <p>
                                    NA TRADES is built on the belief that price only makes sense when time and structure align.
                                </p>
                                
                                <p>
                                    Our approach combines ICT Concepts with Quarterly Theory to explain how price is delivered, why it
                                    moves, and when meaningful expansion is most likely to occur. Rather than reacting to indicators or
                                    isolated patterns, every trade is framed within market structure, liquidity, and time-based context.
                                </p>
                                
                                <p>
                                    This framework forms the foundation of the Understand The Logic of Time & Price course — a
                                    structured system designed to develop clarity, discipline, and consistency. The goal is not just
                                    better entries, but a deeper understanding of market behavior that supports long-term growth,
                                    especially within the demands of prop firm trading.
                                </p>
                                
                                <p>
                                    NA TRADES is committed to mastering the process, respecting market logic, and building repeatable
                                    execution through time, price, and intent.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Trading Systems Section -->
        <section id="systems" class="py-6 sm:py-10 px-4 scroll-mt-20 sm:scroll-mt-24">
            <div class="container mx-auto">
                <h2 class="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">Trading Systems</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto mb-12 sm:mb-16">
                    <!-- AMD Model -->
                    <div
                        class="relative p-[1px] rounded-2xl bg-gradient-to-b from-gray-700/50 via-gray-900/50 to-black/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
                        <div
                            class="bg-gradient-to-b from-[#1C1E22]/80 to-black/90 p-6 sm:p-8 rounded-2xl text-center h-full backdrop-blur-sm">
                            <div class="mb-4 sm:mb-6">
                                <img src="/images/logo-amd.svg" alt="AMD" class="w-16 h-16 sm:w-24 sm:h-24 mx-auto" />
                            </div>
                            <h3 class="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">AMD Model</h3>
                            <p class="text-[#99e18e] text-xs sm:text-sm mb-3 sm:mb-4 opacity-90">Intraday Execution Logic</p>
                            <p class="opacity-80 text-sm sm:text-base mb-3 sm:mb-4">
                                AMD Models are used to read intraday price behavior through time. Price is not random within the day. It consistently follows a logical sequence:
                                <br>
                                <span class="text-[#99e18e]">Accumulation → Manipulation → Distribution</span>
                            </p>
                            <p class="opacity-80 text-sm sm:text-base mb-2 sm:mb-3 text-left">
                                This model helps traders understand:
                            </p>
                            <ul class="text-gray-400 text-xs sm:text-sm mt-2 sm:mt-3 space-y-1.5 text-left mb-3 sm:mb-4">
                                <li>• When price is being built and held within a range</li>
                                <li>• When liquidity is engineered and taken</li>
                                <li>• When real expansion is most likely to occur</li>
                            </ul>
                            <p class="opacity-80 text-xs sm:text-sm mb-3 sm:mb-4 italic">
                                Within the course, AMD acts as the execution layer, applying price logic inside the correct time window.
                            </p>
                            <ul class="text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4 space-y-1 text-left inline-block">
                                <li>• Session-based intraday structure</li>
                                <li>• Liquidity-driven price behavior</li>
                                <li>• Designed for intraday and directional execution</li>
                            </ul>
                        </div>
                    </div>

                    <!-- ICT Concept -->
                    <div
                        class="relative p-[1px] rounded-2xl bg-gradient-to-b from-gray-700/50 via-gray-900/50 to-black/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
                        <div
                            class="bg-gradient-to-b from-[#1C1E22]/80 to-black/90 p-6 sm:p-8 rounded-2xl text-center h-full backdrop-blur-sm">
                            <div class="mb-4 sm:mb-6">
                                <img src="/images/logo-ict.svg" alt="ICT" class="w-16 h-16 sm:w-24 sm:h-24 mx-auto" />
                            </div>
                            <h3 class="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">ICT Concept</h3>
                            <p class="text-[#99e18e] text-xs sm:text-sm mb-3 sm:mb-4 opacity-90">Price Delivery & Market Logic</p>
                            <p class="opacity-80 text-sm sm:text-base mb-3 sm:mb-4">
                                ICT Concepts explain how price is delivered by the market, not just where it moves.
                            </p>
                            <p class="opacity-80 text-sm sm:text-base mb-2 sm:mb-3 text-left">
                                The focus is on understanding:
                            </p>
                            <ul class="text-gray-400 text-xs sm:text-sm mt-2 sm:mt-3 space-y-1.5 text-left mb-3 sm:mb-4">
                                <li>• Liquidity and inducement</li>
                                <li>• Market structure shifts</li>
                                <li>• Institutional reference points such as Order Blocks and Fair Value Gaps</li>
                            </ul>
                            <p class="opacity-80 text-xs sm:text-sm mb-3 sm:mb-4">
                                Rather than reacting to indicators, this framework reveals who is in control of price and why.
                            </p>
                            <p class="opacity-80 text-xs sm:text-sm mb-3 sm:mb-4 italic">
                                Within the course, ICT serves as the price logic engine, supporting confirmation and precise entries when aligned with time.
                            </p>
                            <ul class="text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4 space-y-1 text-left inline-block">
                                <li>• Liquidity-based market behavior</li>
                                <li>• Structure-driven confirmations</li>
                                <li>• Time and price alignment</li>
                            </ul>
                        </div>
                    </div>

                    <!-- Quarterly Theory -->
                    <div
                        class="relative p-[1px] rounded-2xl bg-gradient-to-b from-gray-700/50 via-gray-900/50 to-black/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
                        <div
                            class="bg-gradient-to-b from-[#1C1E22]/80 to-black/90 p-6 sm:p-8 rounded-2xl text-center h-full backdrop-blur-sm">
                            <div class="mb-4 sm:mb-6">
                                <img src="/images/logo-qt.svg" alt="QUANT" class="w-16 h-16 sm:w-24 sm:h-24 mx-auto" />
                            </div>
                            <h3 class="text-xl sm:text-2xl font-bold mb-1 sm:mb-2">Quarterly Theory</h3>
                            <p class="text-[#99e18e] text-xs sm:text-sm mb-3 sm:mb-4 opacity-90">Time-Based Market Framework</p>
                            <p class="opacity-80 text-sm sm:text-base mb-3 sm:mb-4">
                                Quarterly Theory is the time foundation of the course.
                            </p>
                            <p class="opacity-80 text-sm sm:text-base mb-2 sm:mb-3">
                                The core principle is simple:<br>
                                <span class="text-[#99e18e]">Price does not move with intent unless it is in the right time window.</span>
                            </p>
                            <p class="opacity-80 text-sm sm:text-base mb-2 sm:mb-3 text-left">
                                By dividing market time into structured quarters, this framework defines:
                            </p>
                            <ul class="text-gray-400 text-xs sm:text-sm mt-2 sm:mt-3 space-y-1.5 text-left mb-3 sm:mb-4">
                                <li>• When accumulation is expected</li>
                                <li>• When manipulation is likely</li>
                                <li>• When expansion has the highest probability</li>
                            </ul>
                            <p class="opacity-80 text-xs sm:text-sm mb-3 sm:mb-4">
                                The key is not the signal itself, but when the signal appears.
                            </p>
                            <ul class="text-gray-500 text-xs sm:text-sm mt-3 sm:mt-4 space-y-1 text-left inline-block">
                                <li>• Higher-timeframe directional bias</li>
                                <li>• Time-based filtering</li>
                                <li>• Context for all price action decisions</li>
                            </ul>
                        </div>
                    </div>
                </div>
                
                <!-- Framework Summary -->
                <div class="max-w-6xl mx-auto">
                    <div
                        class="relative p-[1px] rounded-2xl bg-gradient-to-b from-gray-700/50 via-gray-900/50 to-black/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
                        <div
                            class="bg-gradient-to-b from-[#1C1E22]/80 to-black/90 p-8 sm:p-10 md:p-12 rounded-2xl backdrop-blur-sm">
                            <h3 class="text-2xl sm:text-3xl font-bold mb-4 sm:mb-6 text-center">How the Framework Works Together</h3>
                            <p class="text-center mb-6 sm:mb-8 text-sm sm:text-base opacity-90">
                                <span class="text-[#99e18e] font-semibold">Understand The Logic of Time & Price</span>
                            </p>
                            <div class="max-w-3xl mx-auto space-y-4 sm:space-y-5 mb-6 sm:mb-8 ">
                                <p class="text-center text-base sm:text-lg opacity-90">
                                    <span class="text-[#99e18e] font-semibold">Quarterly Theory</span> defines when the market is likely to move
                                </p>
                                <p class="text-center text-base sm:text-lg opacity-90">
                                    <span class="text-[#99e18e] font-semibold">ICT Concept</span> explains why price behaves the way it does
                                </p>
                                <p class="text-center text-base sm:text-lg opacity-90">
                                    <span class="text-[#99e18e] font-semibold">AMD Models</span> define how to execute within that window
                                </p>
                            </div>
                            <p class="text-center text-sm sm:text-base opacity-90">
                                This creates a structured, repeatable approach built on<br>
                                <span class="text-[#99e18e] font-semibold">time, logic, and price behavior — not randomness.</span>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Free Learning Section -->
        <section id="free-learning" class="py-6 sm:py-10 px-4 scroll-mt-20 sm:scroll-mt-24">
            <div class="container mx-auto">
                <h2 class="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">Free Learning</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                    <div
                        class="relative p-[1px] rounded-2xl bg-gradient-to-b from-gray-700/50 via-gray-900/50 to-black/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
                        <div
                            class="bg-gradient-to-b from-[#1C1E22]/80 to-black/90 p-4 sm:p-6 rounded-2xl backdrop-blur-sm">
                            <div class="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                                <iframe src="https://www.youtube.com/embed/FAZefHynWd8" title="Free Learning Video 1"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen class="w-full h-full">
                                </iframe>
                            </div>
                        </div>
                    </div>
                    <div
                        class="relative p-[1px] rounded-2xl bg-gradient-to-b from-gray-700/50 via-gray-900/50 to-black/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
                        <div
                            class="bg-gradient-to-b from-[#1C1E22]/80 to-black/90 p-4 sm:p-6 rounded-2xl backdrop-blur-sm">
                            <div class="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                                <iframe src="https://www.youtube.com/embed/MAKnmNTDu1k" title="Free Learning Video 2"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen class="w-full h-full">
                                </iframe>
                            </div>
                        </div>
                    </div>
                    <div
                        class="relative p-[1px] rounded-2xl bg-gradient-to-b from-gray-700/50 via-gray-900/50 to-black/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
                        <div
                            class="bg-gradient-to-b from-[#1C1E22]/80 to-black/90 p-4 sm:p-6 rounded-2xl backdrop-blur-sm">
                            <div class="w-full aspect-video rounded-xl overflow-hidden shadow-lg">
                                <iframe src="https://www.youtube.com/embed/ia-ZhkI2eig" title="Free Learning Video 3"
                                    frameborder="0"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                    allowfullscreen class="w-full h-full">
                                </iframe>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <!-- Course Section -->
        <section id="course" class="py-6 sm:py-10 px-4 scroll-mt-20 sm:scroll-mt-24">
            <div class="container mx-auto">
                <h2 class="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">Understand The Logic of Time & Price</h2>
                <div class="max-w-6xl mx-auto space-y-6 sm:space-y-8">
                    <!-- Top row: 3 images -->
                    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                        <div
                            v-for="(image, index) in courseImages.slice(0, 3)"
                            :key="index"
                            class="relative p-[1px] rounded-2xl bg-gradient-to-b from-gray-700/50 via-gray-900/50 to-black/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl cursor-pointer">
                            <div class="bg-gradient-to-b from-[#1C1E22]/80 to-black/90 p-4 sm:p-6 rounded-2xl backdrop-blur-sm" @click="openImageModal(image.src)">
                                <div class="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                                    <img :src="image.src" :alt="image.alt" class="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Bottom row: 2 images centered -->
                    <div v-if="showBuyCourse" class="flex justify-center">
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 course-bottom-row">
                            <div
                                v-for="(image, index) in courseImages.slice(3, 5)"
                                :key="index + 3"
                                class="relative p-[1px] rounded-2xl bg-gradient-to-b from-gray-700/50 via-gray-900/50 to-black/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl cursor-pointer">
                                <div class="bg-gradient-to-b from-[#1C1E22]/80 to-black/90 p-4 sm:p-6 rounded-2xl backdrop-blur-sm" @click="openImageModal(image.src)">
                                    <div class="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                                        <img :src="image.src" :alt="image.alt" class="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <!-- Join Button -->
                    <div v-if="courseLink !== ''" class="flex justify-center mt-6 sm:mt-8">
                        <a
                            :href="courseLink"
                            target="_blank"
                            rel="noopener noreferrer"
                            class="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#99e18e] to-[#7bc86a] hover:from-[#7bc86a] hover:to-[#99e18e] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                            Join Course
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Private Course Section -->
         <section v-if="showBuyPrivateCourse" id="private-course" class="py-6 sm:py-10 px-4 scroll-mt-20 sm:scroll-mt-24">
            <div class="container mx-auto">
                <h2 class="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">Private Course & Mentorship</h2>
                <div class="max-w-6xl mx-auto space-y-6 sm:space-y-8 flex flex-col items-center">
                    <div class="flex flex-wrap justify-center gap-6 sm:gap-8 w-full">
                        <div v-for="(image, index) in privateCourseImages" :key="index"
                            class="relative p-[1px] rounded-2xl bg-gradient-to-b from-gray-700/50 via-gray-900/50 to-black/50 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl cursor-pointer w-full sm:max-w-sm lg:max-w-sm">
                            <div class="bg-gradient-to-b from-[#1C1E22]/80 to-black/90 p-4 sm:p-6 rounded-2xl backdrop-blur-sm"
                                @click="openImageModal(image.src)">
                                <div class="w-full aspect-[4/3] rounded-xl overflow-hidden shadow-lg">
                                    <img :src="image.src" :alt="image.alt"
                                        class="w-full h-full object-cover transition-transform duration-300 hover:scale-110" />
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Join Button -->
                    <div v-if="privateCourseLink !== ''" class="flex justify-center mt-6 sm:mt-8 w-full">
                        <a :href="privateCourseLink" target="_blank" rel="noopener noreferrer"
                            class="inline-flex items-center justify-center px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-[#99e18e] to-[#7bc86a] hover:from-[#7bc86a] hover:to-[#99e18e] rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105">
                            Join Private Course
                        </a>
                    </div>
                </div>
            </div>
        </section>

        <!-- Image Modal -->
        <Transition name="modal">
            <div
                v-if="isModalOpen && selectedImage"
                class="fixed inset-0 z-50 flex items-center justify-center bg-black/95 backdrop-blur-sm p-4"
                @click="closeImageModal">
                <div class="relative max-w-7xl w-full max-h-[95vh] flex items-center justify-center" @click.stop>
                    <button
                        @click="closeImageModal"
                        class="absolute top-4 right-4 z-10 w-10 h-10 flex items-center justify-center text-white hover:text-[#99e18e] transition-colors duration-200 text-3xl font-bold bg-black/50 rounded-full hover:bg-black/70 backdrop-blur-sm">
                        ✕
                    </button>
                    <img :src="selectedImage" alt="Course Image" class="max-w-full max-h-[95vh] w-auto h-auto object-contain rounded-lg shadow-2xl" />
                </div>
            </div>
        </Transition>

        <!-- Prop Firm Certified Section -->
        <!-- <section id="certified" class="py-8 sm:py-12 px-4">
            <div class="container mx-auto">
                <h2 class="text-3xl sm:text-4xl font-bold mb-8 sm:mb-12 text-center">Prop Firm Certified</h2>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
                    <div
                        class="relative p-[1px] rounded-2xl bg-gradient-to-b from-gray-700/50 via-gray-900/50 to-black/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
                        <div
                            class="bg-gradient-to-b from-[#1C1E22]/80 to-black/90 p-6 sm:p-8 rounded-2xl text-center h-full backdrop-blur-sm flex flex-col items-center">
                            <div class="w-full aspect-[4/3] mb-6 rounded-xl overflow-hidden shadow-lg">
                                <img :src="`${blobBaseUrl}/images/certificate-topstep-PCqPUEX9bEdFVn8Lr4OOtvwtxyQgIE.jpg`"
                                    alt="Topstep" class="w-full h-full object-cover" />
                            </div>
                            <h3 class="text-xl sm:text-2xl font-bold text-white/90">Topstep</h3>
                        </div>
                    </div>
                    <div
                        class="relative p-[1px] rounded-2xl bg-gradient-to-b from-gray-700/50 via-gray-900/50 to-black/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
                        <div
                            class="bg-gradient-to-b from-[#1C1E22]/80 to-black/90 p-6 sm:p-8 rounded-2xl text-center h-full backdrop-blur-sm flex flex-col items-center">
                            <div class="w-full aspect-[4/3] mb-6 rounded-xl overflow-hidden shadow-lg">
                                <img :src="`${blobBaseUrl}/images/certificate-takeprofittrader-0ya8QnlK14j0ULSzfzgBkRvtcHvgW4.jpg`"
                                    alt="Take Profit Trader" class="w-full h-full object-cover" />
                            </div>
                            <h3 class="text-xl sm:text-2xl font-bold text-white/90">Take Profit Trader</h3>
                        </div>
                    </div>
                    <div
                        class="relative p-[1px] rounded-2xl bg-gradient-to-b from-gray-700/50 via-gray-900/50 to-black/50 backdrop-blur-sm transition-all duration-300 hover:shadow-2xl">
                        <div
                            class="bg-gradient-to-b from-[#1C1E22]/80 to-black/90 p-6 sm:p-8 rounded-2xl text-center h-full backdrop-blur-sm flex flex-col items-center">
                            <div class="w-full aspect-[4/3] mb-6 rounded-xl overflow-hidden shadow-lg">
                                <img :src="`${blobBaseUrl}/images/certificate-the5%25er-jrUEnz42TMlWBPovkAto984mnWCPCr.png`"
                                    alt="The5%ers" class="w-full h-full object-cover" />
                            </div>
                            <h3 class="text-xl sm:text-2xl font-bold text-white/90">The5%ers</h3>
                        </div>
                    </div>
                </div>
            </div>
        </section> -->

        <!-- Contact Section -->
        <section id="contact" class="py-6 sm:py-10 px-4 scroll-mt-20 sm:scroll-mt-24">
            <div class="container mx-auto text-center">
                <h2 class="text-3xl sm:text-4xl font-bold mb-6 sm:mb-10">Contact</h2>
                <div class="flex justify-center gap-8 mb-8">
                    <a :href="youtubeLink" target="_blank"
                        class="bg-[#39493a] rounded-full w-14 h-14 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl">
                        <i class="fab fa-youtube text-[#a1de9a] text-3xl"></i>
                    </a>
                    <!-- <a :href="telegramLink" target="_blank"
                        class="bg-[#39493a] rounded-full w-14 h-14 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl">
                        <i class="fab fa-telegram text-[#a1de9a] text-3xl"></i>
                    </a> -->
                    <a :href="fbLink" target="_blank"
                        class="bg-[#39493a] rounded-full w-14 h-14 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl">
                        <i class="fab fa-facebook text-[#a1de9a] text-3xl"></i>
                    </a>
                    <a :href="igLink" target="_blank"
                        class="bg-[#39493a] rounded-full w-14 h-14 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl">
                        <i class="fab fa-instagram text-[#a1de9a] text-3xl"></i>
                    </a>
                    <a :href="tiktokLink" target="_blank"
                        class="bg-[#39493a] rounded-full w-14 h-14 flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-2xl">
                        <i class="fab fa-tiktok text-[#a1de9a] text-3xl"></i>
                    </a>
                </div>
                <p class="max-w-3xl mx-auto text-base sm:text-lg opacity-90 mb-8">Email : natrades.contact@gmail.com</p>
            </div>
            <div class="w-full h-0.5 my-10 rounded-full glow-line"></div>
            <div class="container mx-auto text-center">
                <p class="mt-0 sm:mt-4 text-xs sm:text-sm opacity-60">© 2025 NA TRADES. All rights reserved.</p>
            </div>
        </section>
    </main>
</template>

<style scoped>
.container {
    max-width: 1400px;
}

/* Modal transitions */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

/* Course section - make bottom row same size as top row */
/* On lg screens: top row has 3 cols with gap-8 (2rem), so each item = (100% - 2*2rem)/3 */
/* Bottom row should have 2 items with same width, so max-width = (100% - 2*2rem)/3 * 2 + 1*2rem */
@media (min-width: 1024px) {
    .course-bottom-row {
        max-width: calc(((100% - 4rem) / 3) * 2 + 2rem);
    }
}

/* On md screens: top row has 2 cols with gap-6 (1.5rem), so each item = (100% - 1*1.5rem)/2 */
/* Bottom row should have 2 items with same width */
@media (min-width: 640px) and (max-width: 1023px) {
    .course-bottom-row {
        max-width: 100%;
    }
}

/* Fix white background flash on scroll */
:global(html),
:global(body) {
    background-color: #000;
    margin: 0;
    padding: 0;
    overflow-x: hidden;
}

/* Glow line animation */
.glow-line {
    position: relative;
    background: linear-gradient(to right, transparent, rgba(182, 238, 176, 0.2), transparent);
    overflow: hidden;
}

.glow-line::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 30%;
    height: 100%;
    background: linear-gradient(
        90deg,
        transparent,
        rgba(182, 238, 176, 0.6),
        rgba(182, 238, 176, 1),
        rgba(182, 238, 176, 0.6),
        transparent
    );
    box-shadow: 0 0 20px rgba(182, 238, 176, 0.8);
    animation: glow-sweep 3s ease-in-out infinite;
}

@keyframes glow-sweep {
    0% {
        left: -30%;
    }
    100% {
        left: 100%;
    }
}
</style>
