import murchison from '@/assets/murchison-falls.webp';
import uganda from '@/assets/uganda.jpg';
import guides from '@/assets/guides.jpg';
import ken from '@/assets/ken.jpg';
import serengeti from '@/assets/serengeti.jpg';
import lakeMburo from '@/assets/lake-mburo.jpeg';
import rwanda from '@/assets/rwanda.jpg';
import ngorongoro from '@/assets/ngorongoro-crater.jpg';
import amboseli from '@/assets/amboseli-national-park.jpg';
import zanzibar from '@/assets/zanzibar.jpg';

const safarisData = [
    {
        id: 1,
        title: "2-Days Murchison Falls National Park Safari",
        country: "uganda",
        location: "Murchison Falls National Park",
        duration: "2 Days / 1 Night",
        image: murchison,
        description:
            "Experience Uganda’s largest and most dramatic national park on this 2-day adventure. Your journey begins with a scenic drive from Kampala through the lush countryside, arriving in time for an afternoon game drive where you’ll spot elephants, lions, giraffes, and countless antelopes. The highlight awaits on day two: a morning boat cruise along the Victoria Nile to the base of the thundering Murchison Falls – a spectacle where the river forces itself through a narrow 7-meter gorge. From there, you’ll hike to the top of the falls for a breathtaking viewpoint. Throughout the safari, you’ll be accompanied by an expert guide who shares insights about the park’s ecology and wildlife. Accommodation is in a comfortable lodge or tented camp with meals included, ensuring a seamless and memorable short safari.",
        priceUSD: 450,
        priceLocal: "UGX 1,700,000",
        highlights: [
            "Game drive in Murchison Falls National Park",
            "Boat cruise on River Nile",
            "Visit to the top of the falls",
            "Professional safari guide"
        ],
        itinerary: [
            "Day 1: Depart Kampala early morning, drive to Murchison Falls with a stop at Ziwa Rhino Sanctuary (optional). Arrive at the park, check into lodge, and enjoy an afternoon game drive on the northern bank. Return to lodge for dinner and overnight.",
            "Day 2: Early morning boat cruise to the base of Murchison Falls. Hike to the top of the falls for spectacular views. After lunch, drive back to Kampala, arriving in the evening."
        ],
        inclusions: [
            "Private 4x4 safari vehicle with pop-up roof",
            "Professional English-speaking guide",
            "All park entry fees",
            "1 night accommodation in a mid-range lodge/tented camp",
            "Boat cruise on the Nile",
            "Game drives as per itinerary",
            "Bottled water during the safari",
            "All meals as specified"
        ],
        exclusions: [
            "International flights",
            "Visa fees",
            "Personal travel insurance",
            "Alcoholic and soft drinks",
            "Tips and gratuities",
            "Optional activities (e.g., Ziwa Rhino trekking)",
            "Laundry services"
        ],
        accommodation: "Comfortable mid-range lodge or tented camp with en-suite facilities, located near the park gate or along the Nile. Options include Pakuba Safari Lodge, Murchison River Lodge, or similar.",
        bestTime: "Year-round, but dry seasons (June–September and December–February) offer best game viewing.",
        activities: ["Game drives", "Boat cruise", "Nature walks", "Bird watching"]
    },

    {
        id: 2,
        title: "2-Days Bwindi Gorilla Trekking Safari",
        country: "uganda",
        location: "Bwindi Impenetrable National Park",
        duration: "2 Days / 1 Night",
        image: uganda,
        description:
            "This 2-day safari is dedicated to one of the world’s most extraordinary wildlife encounters: trekking to see endangered mountain gorillas in Bwindi Impenetrable Forest. Early morning on day two, after an overnight stay near the park, you’ll set out with experienced trackers into the dense jungle. The trek may last 2 to 6 hours depending on the gorilla family’s location, but once you find them, you’ll spend a magical hour observing these gentle giants in their natural habitat – watching them feed, play, and interact. The experience is humbling and unforgettable. Included are all park permits, a professional guide, and accommodation at a rustic lodge or community-run camp. You’ll also have the chance to visit a local village to learn about the Batwa pygmy culture, making this safari both a wildlife and cultural journey.",
        priceUSD: 750,
        priceLocal: "UGX 2,850,000",
        highlights: [
            "Mountain gorilla trekking experience",
            "Scenic drive through western Uganda",
            "Guided forest trek",
            "Cultural village visit"
        ],
        itinerary: [
            "Day 1: Early departure from Kampala or Kigali (Rwanda) to Bwindi. Scenic drive through terraced hills and tropical forests. Arrive in the afternoon, check into lodge, and enjoy a cultural visit to a Batwa community (optional).",
            "Day 2: After breakfast, head to the park headquarters for a briefing. Embark on the gorilla trek (allow 2–6 hours). Spend one hour with the gorilla family. Return to lodge for lunch, then drive back to Kampala/Kigali."
        ],
        inclusions: [
            "Gorilla trekking permit (USD 800 in Uganda, additional if starting from Rwanda)",
            "Private 4x4 transportation",
            "Professional guide",
            "1 night accommodation in a mid-range lodge",
            "All meals as specified",
            "Bottled water",
            "Park entry fees"
        ],
        exclusions: [
            "International flights",
            "Visa fees",
            "Travel insurance",
            "Alcoholic drinks",
            "Tips",
            "Optional activities (e.g., Batwa cultural experience)"
        ],
        accommodation: "Lodges near Bwindi such as Bakiga Lodge, Ichumbi Gorilla Lodge, or Rushaga Gorilla Camp, offering cozy rooms with en-suite bathrooms and stunning forest views.",
        bestTime: "Dry seasons (June–September and December–February) for easier trekking, though gorilla trekking is possible year-round.",
        activities: ["Gorilla trekking", "Cultural visits", "Nature walks", "Bird watching"]
    },

    {
        id: 3,
        title: "3-Days Queen Elizabeth Wildlife Safari",
        country: "uganda",
        location: "Queen Elizabeth National Park",
        duration: "3 Days / 2 Nights",
        image: guides,
        description:
            "Queen Elizabeth National Park is a wildlife haven, and this 3-day safari immerses you in its diverse ecosystems. Over three days, you’ll enjoy game drives along the Kasenyi Plains, known for large herds of buffalo and elephants, as well as lions lounging in acacia trees. The Kazinga Channel boat cruise is a highlight – a 2-hour journey where you’ll see hippos, crocodiles, and a parade of elephants and buffalo drinking at the water’s edge. On day three, you’ll venture to the Ishasha sector, famous for its tree-climbing lions. Accommodation is in a mid-range lodge with all meals included, and your expert guide ensures you don’t miss any of the park’s hidden gems. This safari is ideal for travelers seeking a comprehensive Ugandan wildlife experience in a short time.",
        priceUSD: 620,
        priceLocal: "UGX 2,350,000",
        highlights: [
            "Game drives in Queen Elizabeth National Park",
            "Boat cruise on Kazinga Channel",
            "Tree-climbing lions in Ishasha",
            "Bird watching experience"
        ],
        itinerary: [
            "Day 1: Depart Kampala early morning, drive to Queen Elizabeth via Mbarara. Enjoy a scenic stop at the Equator crossing. Arrive in the afternoon, check into lodge, and do a short evening game drive in the Kasenyi area.",
            "Day 2: Early morning game drive to see lions, elephants, and buffalo. After breakfast, take a boat cruise on the Kazinga Channel. Relax in the afternoon or opt for a guided nature walk.",
            "Day 3: Drive to Ishasha sector in search of tree-climbing lions. After lunch, begin the journey back to Kampala, arriving in the evening."
        ],
        inclusions: [
            "Private 4x4 vehicle with pop-up roof",
            "English-speaking guide",
            "Park entry fees",
            "2 nights accommodation in a mid-range lodge",
            "All meals",
            "Boat cruise on Kazinga Channel",
            "Game drives",
            "Bottled water"
        ],
        exclusions: [
            "International flights",
            "Visa",
            "Travel insurance",
            "Alcoholic drinks",
            "Tips",
            "Optional activities (e.g., lion tracking, chimpanzee trekking in Kyambura Gorge)"
        ],
        accommodation: "Lodges like Enganzi Game Lodge, The Bush Lodge, or Buffalo Safari Lodge, featuring comfortable rooms, swimming pool, and excellent views of the park.",
        bestTime: "Dry seasons (June–September, December–February) for best game viewing. Ishasha tree-climbing lions are more visible in drier months.",
        activities: ["Game drives", "Boat cruise", "Chimpanzee trekking", "Bird watching", "Nature walks"]
    },

    {
        id: 4,
        title: "3-Days Masai Mara Safari Adventure",
        country: "kenya",
        location: "Masai Mara National Reserve",
        duration: "3 Days / 2 Nights",
        image: ken,
        description:
            "Discover the world‑renowned Masai Mara on this 3-day adventure that captures the essence of an African safari. You’ll have multiple game drives across the vast savannah, with excellent chances to see the Big Five – lion, leopard, elephant, rhino, and buffalo. If your visit coincides with the Great Migration (July–October), you may witness thousands of wildebeest and zebra crossing the Mara River. Beyond wildlife, you’ll visit a traditional Maasai village to learn about their vibrant culture and customs. Accommodation is in a comfortable tented camp or lodge, with all meals and park fees included. With sunrise and sunset game drives, your professional guide will ensure you experience the Mara at its most photogenic and wildlife‑rich moments.",
        priceUSD: 820,
        priceLocal: "KES 110,000",
        highlights: [
            "Big Five game drives",
            "Maasai cultural experience",
            "Sunrise and sunset safari drives",
            "Professional safari guide"
        ],
        itinerary: [
            "Day 1: Pick up from Nairobi in the morning. Drive to the Masai Mara with a stop at the Great Rift Valley viewpoint. Arrive in time for lunch, check into camp, and enjoy an afternoon game drive.",
            "Day 2: Full day in the Mara. Morning and afternoon game drives exploring the reserve, with an option for a hot air balloon safari (extra cost). Picnic lunch in the wild.",
            "Day 3: Early morning game drive, then return to camp for breakfast. Visit a Maasai village (optional). After lunch, drive back to Nairobi, arriving in the late afternoon."
        ],
        inclusions: [
            "Transport in a safari minivan or 4x4 Jeep with pop-up roof",
            "Professional driver/guide",
            "Park entry fees",
            "2 nights accommodation in a tented camp/lodge",
            "All meals",
            "Game drives as per itinerary",
            "Bottled water"
        ],
        exclusions: [
            "International flights",
            "Visa fees",
            "Travel insurance",
            "Alcoholic beverages",
            "Tips",
            "Hot air balloon safari",
            "Maasai village visit fee"
        ],
        accommodation: "Comfortable tented camps like Enchoro Wildlife Camp, Miti Mingi Eco Camp, or similar, offering authentic bush experience with en-suite facilities.",
        bestTime: "July–October for the Great Migration; year-round game viewing is excellent. Dry months (June–October) offer the best wildlife concentration.",
        activities: ["Game drives", "Hot air balloon safaris", "Maasai cultural visits", "Bird watching"]
    },

    {
        id: 5,
        title: "4-Days Serengeti Wildlife Safari",
        country: "tanzania",
        location: "Serengeti National Park",
        duration: "4 Days / 3 Nights",
        image: serengeti,
        description:
            "Experience the endless plains of the Serengeti, one of Africa’s premier safari destinations, on this 4‑day journey. You’ll spend your days exploring the park’s diverse landscapes – from the southern short‑grass plains to the central Seronera valley – on extensive game drives led by an expert guide. Depending on the season, you may witness the awe‑inspiring Great Migration, where millions of wildebeest and zebra move in search of fresh grazing. Nights are spent in a luxurious safari lodge or tented camp, allowing you to relax under star‑lit skies. Included are all meals, park entry fees, and the expertise of a professional driver‑guide who will help you spot predators, elephants, giraffes, and an array of birdlife. This safari is perfect for those seeking both adventure and comfort in Tanzania’s most iconic wilderness.",
        priceUSD: 1100,
        priceLocal: "TZS 2,850,000",
        highlights: [
            "Serengeti game drives",
            "Great migration experience",
            "Luxury safari lodge stay",
            "Wildlife photography"
        ],
        itinerary: [
            "Day 1: Fly or drive from Arusha to the Serengeti. Afternoon game drive in the central Seronera area, known for big cats. Overnight in a lodge or tented camp.",
            "Day 2: Full day game drive exploring the Serengeti. Depending on migration, you may go to the Western Corridor or northern Serengeti. Picnic lunch in the bush.",
            "Day 3: Continue game drives. Optional hot air balloon safari at sunrise. Visit a Maasai rock painting site or a river crossing point if migration is active.",
            "Day 4: Early morning game drive, then return to lodge for breakfast. Depart for Arusha or to the Ngorongoro Crater for an extended safari."
        ],
        inclusions: [
            "Private 4x4 safari vehicle with pop-up roof",
            "Professional English-speaking guide",
            "Park entry fees",
            "3 nights accommodation in a tented camp/lodge",
            "All meals",
            "Game drives as per itinerary",
            "Bottled water"
        ],
        exclusions: [
            "International flights",
            "Visa fees",
            "Travel insurance",
            "Alcoholic drinks",
            "Tips",
            "Hot air balloon safari (approx. USD 600 per person)",
            "Optional Ngorongoro Crater fees if added"
        ],
        accommodation: "Mid-range to luxury tented camps or lodges such as Serengeti Heritage Camp, Seronera Wildlife Lodge, or similar, offering full-board and en-suite facilities.",
        bestTime: "Year-round; the Great Migration is in the southern Serengeti (Dec–Mar) and northern Serengeti (Jul–Oct). Dry season (Jun–Oct) offers best predator viewing.",
        activities: ["Game drives", "Hot air balloon safaris", "Maasai cultural visits", "Bird watching"]
    },

    {
        id: 6,
        title: "2-Days Lake Mburo Wildlife Safari",
        country: "uganda",
        location: "Lake Mburo National Park",
        duration: "2 Days / 1 Night",
        image: lakeMburo,
        description:
            "This 2-day safari is the perfect quick escape from Kampala or Entebbe, offering a compact but rich wildlife experience. Lake Mburo is the only park in Uganda where you can see zebras and giraffes in large numbers, and you’ll enjoy a game drive to spot these iconic animals alongside impalas, elands, and waterbuck. A highlight is a relaxing boat ride on Lake Mburo itself, where you’ll see hippos, crocodiles, and many bird species. For the adventurous, a guided nature walk on the shores offers a chance to encounter animals on foot with a ranger. Accommodation is at a scenic lodge near the lake, with meals included. The short travel time and variety of activities make this an ideal add‑on to any Uganda itinerary.",
        priceUSD: 380,
        priceLocal: "UGX 1,450,000",
        highlights: [
            "Zebra and giraffe game drive",
            "Boat ride on Lake Mburo",
            "Nature walking safari",
            "Scenic countryside drive"
        ],
        itinerary: [
            "Day 1: Depart Kampala early morning and drive to Lake Mburo. Enjoy a game drive en route to the lodge. After lunch, take a boat cruise on Lake Mburo to see hippos and birds. Optional evening nature walk.",
            "Day 2: Early morning game drive to see zebras, giraffes, and elands. Return for breakfast, then drive back to Kampala, arriving before lunch."
        ],
        inclusions: [
            "Private 4x4 vehicle",
            "Professional guide",
            "Park entry fees",
            "1 night accommodation in a lodge",
            "All meals",
            "Boat cruise",
            "Game drives",
            "Bottled water"
        ],
        exclusions: [
            "International flights",
            "Visa",
            "Travel insurance",
            "Alcoholic drinks",
            "Tips",
            "Nature walk ranger fee (optional)"
        ],
        accommodation: "Lodges like Rwakobo Rock, Eagles Nest, or Lake Mburo Safari Lodge, offering comfortable cottages with lake or bush views.",
        bestTime: "Year-round. Dry seasons (June–August, December–February) are best for game viewing and walking safaris.",
        activities: ["Game drives", "Boat cruise", "Nature walks", "Bird watching", "Mountain biking"]
    },

    {
        id: 7,
        title: "5-Days Rwanda Gorilla & Wildlife Safari",
        country: "rwanda",
        location: "Volcanoes National Park & Akagera National Park",
        duration: "5 Days / 4 Nights",
        image: rwanda,
        description:
            "This 5‑day safari combines the two distinct sides of Rwanda: the montane forests of Volcanoes National Park, home to endangered mountain gorillas, and the savannah of Akagera National Park. After a Kigali city tour, you’ll head north to the Virunga mountains for an unforgettable gorilla trek – a challenging but deeply rewarding hike to spend an hour with a gorilla family. The following days take you east to Akagera, where you’ll go on game drives searching for elephants, giraffes, zebras, and the park’s reintroduced lions and rhinos. A boat trip on Lake Ihema offers views of hippos and crocodiles. Throughout, you’ll stay in comfortable lodges with all meals included. This safari offers a complete Rwandan adventure: primates, classic wildlife, and the country’s legendary hospitality.",
        priceUSD: 1650,
        priceLocal: "RWF 2,100,000",
        highlights: [
            "Mountain gorilla trekking",
            "Game drive in Akagera National Park",
            "Cultural experience in Kigali",
            "Luxury safari lodge stay"
        ],
        itinerary: [
            "Day 1: Arrive at Kigali airport, meet your guide, and transfer to Volcanoes National Park (approx. 2.5 hours). Overnight at a lodge near the park.",
            "Day 2: Early morning gorilla trekking in Volcanoes NP. After the trek, visit the Ellen DeGeneres Campus of the Dian Fossey Gorilla Fund. Overnight at the lodge.",
            "Day 3: Drive to Akagera National Park (approx. 4 hours). Afternoon game drive in the southern part of the park. Overnight at a lodge inside or near the park.",
            "Day 4: Full day in Akagera. Morning game drive to search for lions, elephants, and rhinos. Afternoon boat trip on Lake Ihema. Overnight.",
            "Day 5: Early morning game drive, then return to Kigali. Enjoy a city tour including the Kigali Genocide Memorial. Transfer to airport for departure."
        ],
        inclusions: [
            "Private 4x4 vehicle",
            "English-speaking guide",
            "Gorilla trekking permit (USD 1500 per person)",
            "Park entry fees",
            "4 nights accommodation in mid-range lodges",
            "All meals",
            "Game drives in Akagera",
            "Lake Ihema boat cruise",
            "Kigali city tour",
            "Bottled water"
        ],
        exclusions: [
            "International flights",
            "Visa fees (visa on arrival available)",
            "Travel insurance",
            "Alcoholic drinks",
            "Tips",
            "Optional activities (e.g., Dian Fossey hike, golden monkey trekking)"
        ],
        accommodation: "Mountain Gorilla View Lodge or similar near Volcanoes, and Akagera Game Lodge or Ruzizi Tented Camp in Akagera, offering comfort and stunning views.",
        bestTime: "Dry seasons (June–September, December–February) for easier trekking and game viewing. Gorilla permits are required year-round and should be booked well in advance.",
        activities: ["Gorilla trekking", "Game drives", "Boat cruise", "Cultural tours", "Bird watching"]
    },

    {
        id: 8,
        title: "3-Days Ngorongoro Crater Safari",
        country: "tanzania",
        location: "Ngorongoro Conservation Area",
        duration: "3 Days / 2 Nights",
        image: ngorongoro,
        description:
            "Spend three days exploring the Ngorongoro Crater, often called Africa’s Eden and one of the continent’s natural wonders. After a scenic drive from Arusha, you’ll descend into the caldera – a vast, self‑contained ecosystem teeming with wildlife. A full‑day game drive within the crater gives you the chance to see the Big Five (lion, leopard, elephant, rhino, buffalo) as well as hippos in the permanent soda lake and huge flocks of flamingos. The crater’s high walls create a unique microclimate and spectacular scenery. Accommodation is at a lodge perched on the crater rim, offering breathtaking views and all meals. Your expert guide will ensure you maximize every moment in this UNESCO World Heritage Site, making it a perfect choice for photographers and nature lovers alike.",
        priceUSD: 950,
        priceLocal: "TZS 2,400,000",
        highlights: [
            "Ngorongoro Crater game drive",
            "Wildlife photography",
            "Professional safari guide",
            "Luxury safari accommodation"
        ],
        itinerary: [
            "Day 1: Depart Arusha early morning, drive to Ngorongoro. Descend into the crater for a half-day game drive. Enjoy a picnic lunch inside the crater. Ascend to your lodge on the rim for overnight.",
            "Day 2: Full day in the crater. Early morning descent for a sunrise game drive. Explore the crater floor, visit Lake Magadi to see flamingos and hippos. Return to lodge for dinner and overnight.",
            "Day 3: Option for another short game drive in the crater or a visit to a Maasai village. After breakfast, drive back to Arusha, arriving in the afternoon."
        ],
        inclusions: [
            "Private 4x4 vehicle with pop-up roof",
            "Professional guide",
            "Ngorongoro Crater entry and conservation fees",
            "2 nights accommodation on the crater rim",
            "All meals",
            "Game drives as per itinerary",
            "Bottled water"
        ],
        exclusions: [
            "International flights",
            "Visa fees",
            "Travel insurance",
            "Alcoholic drinks",
            "Tips",
            "Maasai village visit fee"
        ],
        accommodation: "Lodges on the crater rim such as Ngorongoro Serena Safari Lodge, Ngorongoro Wildlife Lodge, or Rhino Lodge, offering spectacular views and easy access to the crater floor.",
        bestTime: "Year-round; dry season (June–October) offers excellent wildlife visibility. The crater is stunning in all seasons.",
        activities: ["Game drives", "Maasai cultural visits", "Bird watching", "Photography"]
    },

    {
        id: 9,
        title: "3-Days Amboseli National Park Safari",
        country: "kenya",
        location: "Amboseli National Park",
        duration: "3 Days / 2 Nights",
        image: amboseli,
        description:
            "Amboseli is renowned for its large elephant herds and the iconic backdrop of Mount Kilimanjaro, Africa’s highest peak. Over three days, you’ll enjoy multiple game drives that bring you close to the park’s massive elephant population, as well as lions, cheetahs, buffalo, and giraffes. The views of Kilimanjaro at sunrise and sunset are unforgettable, making this a paradise for photographers. Your safari includes all meals, accommodation in a comfortable lodge or tented camp, and the services of a professional guide. A visit to a Maasai community can be arranged, offering insight into the local culture. This safari is ideal for travelers seeking classic Kenyan wildlife combined with majestic mountain scenery.",
        priceUSD: 780,
        priceLocal: "KES 105,000",
        highlights: [
            "Elephant wildlife experience",
            "Views of Mount Kilimanjaro",
            "Game drives in Amboseli",
            "Photography safari"
        ],
        itinerary: [
            "Day 1: Depart Nairobi early morning, drive to Amboseli. Arrive in time for lunch, check into lodge, and enjoy an afternoon game drive to see elephants against the backdrop of Kilimanjaro.",
            "Day 2: Full day in Amboseli. Morning and afternoon game drives exploring the park’s swamps and plains. Optional visit to a Maasai village or a nature walk.",
            "Day 3: Early morning game drive to capture sunrise over Kilimanjaro. Return to lodge for breakfast, then drive back to Nairobi, arriving in the early afternoon."
        ],
        inclusions: [
            "Transport in a safari minivan or 4x4 Jeep",
            "Professional driver/guide",
            "Park entry fees",
            "2 nights accommodation in a lodge/tented camp",
            "All meals",
            "Game drives as per itinerary",
            "Bottled water"
        ],
        exclusions: [
            "International flights",
            "Visa fees",
            "Travel insurance",
            "Alcoholic drinks",
            "Tips",
            "Maasai village visit fee"
        ],
        accommodation: "Lodges such as Amboseli Serena Safari Lodge, Kibo Safari Camp, or Ol Tukai Lodge, offering excellent views of Mount Kilimanjaro and comfortable facilities.",
        bestTime: "Year-round; dry seasons (June–October, December–March) offer clearer views of Kilimanjaro and easier game viewing.",
        activities: ["Game drives", "Maasai cultural visits", "Bird watching", "Photography"]
    },

    {
        id: 10,
        title: "4-Days Zanzibar Beach & Island Safari",
        country: "tanzania",
        location: "Zanzibar Island",
        duration: "4 Days / 3 Nights",
        image: zanzibar,
        description:
            "After the excitement of a mainland safari, unwind on the spice island of Zanzibar with this 4‑day beach and cultural escape. You’ll stay in a luxury beachfront resort, with days spent relaxing on pristine white‑sand beaches, swimming in turquoise waters, and enjoying optional snorkeling excursions to see vibrant coral reefs and marine life. The itinerary includes a guided tour of Stone Town, a UNESCO World Heritage Site, where you’ll wander through narrow alleys, visit the former slave market, and immerse yourself in the island’s Swahili‑Arab heritage. A spice tour reveals Zanzibar’s famous cloves and vanilla plantations. All meals are included, and you’ll have plenty of free time to personalize your experience. This is the perfect way to end an East African safari with relaxation and culture.",
        priceUSD: 890,
        priceLocal: "TZS 2,250,000",
        highlights: [
            "Zanzibar beach experience",
            "Stone Town cultural tour",
            "Snorkeling and ocean activities",
            "Luxury beach resort stay"
        ],
        itinerary: [
            "Day 1: Arrive at Zanzibar Airport (ZNZ). Transfer to a beach resort in the north or east coast. Relax and enjoy the beach.",
            "Day 2: After breakfast, optional snorkeling trip to Mnemba Atoll or a village tour. Afternoon at leisure.",
            "Day 3: Morning spice tour to learn about Zanzibar’s spice plantations. Afternoon Stone Town tour: visit the Old Fort, House of Wonders, and the slave market. Overnight in Stone Town or return to the beach.",
            "Day 4: Breakfast, then transfer to the airport for departure or connect to another destination."
        ],
        inclusions: [
            "Airport transfers",
            "3 nights accommodation in a beach resort (all-inclusive or half-board depending on option)",
            "Stone Town guided tour",
            "Spice tour",
            "All meals as specified",
            "Transport for excursions"
        ],
        exclusions: [
            "International flights",
            "Visa fees (visa on arrival available)",
            "Travel insurance",
            "Snorkeling excursions (extra cost)",
            "Alcoholic drinks",
            "Tips"
        ],
        accommodation: "Beach resorts such as Meliá Zanzibar, Zanzibar Serena Hotel, or a comfortable boutique hotel in Stone Town, depending on the selected package.",
        bestTime: "Year-round; best weather from June–October and December–February. Avoid long rains (March–May).",
        activities: ["Beach relaxation", "Snorkeling", "Diving", "Stone Town tours", "Spice tours", "Swimming with dolphins"]
    }
];

export default safarisData;