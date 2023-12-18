import Navbar from "../components/common/Navbar"
import Footer from "../components/common/Footer"
import images from "../assets/images/ClimbingScale.jpg"

function FAQPage() {

    const ClimbingScaleImage = images;

    return (
        <div>
            <Navbar />
            <div className='page-container'>
                <h1>How are climbs graded?</h1>
                <p>Outdoor climbing grades are determined through consensus. The first person to climb a climb the first ascensionist will assign a difficulty grade. Then anyone who comes in and climbs it after will either agree or challenge the grade. Debate to determine a climb's most up-to-date grade happens through the publication of climbing guidebooks or website forums like Mountain Project. The comments section on Mountain Project gets pretty lively, especially when something physically changes on a climbing route or a boulder, like a hold breaking. Sometimes grades can also be called into question when climbers find new beta for a climb like a hidden rest or a knee bar. The addition of knee pads to make knee bars easier have called into question a lot of classic well-established climbs!</p>
                <h2>Sport Climbing Grades</h2>
                    <img
                        alt="Scale"
                        src={ClimbingScaleImage}
                        height="500"
                        class="center"
                        className="d-inline-block align-center"
                    />
                <p>Climbers predominantly use two grading systems to determine the difficulty of roped climbing routes: The Yosemite Decimal System and the French Scale. </p>
                <h3>What is the YDS (Yosemite Decimal System)</h3>
                <p>YDS stands for the Yosemite Decimal System and it is a grading system for hiking, scrambling, and climbing. While it is primarily used in the U.S., you can find YDS grades all around the world. There are 3 parts to a YDS grade. Let’s break it down the grade 5.12a. The "5" refers to the “Class” of the hike, scramble, or climb. A "1" would be relatively flat land while a 5 is a rock wall that requires a rope and/or other gear to climb. A Grade 4  would require the use of hands and feet to scramble over terrain. All rock climbs in the gym with a rope are going to be class 5. The ".12" refers to the difficulty of the climb. This second number runs from 2-15 and describes the difficulty of the moves and the size of holds on the climb. The "a" ​After the grade 5.10, climbers add a letter, a, b, c, or d, to give add more specificity within a given grade. A 5.12a is going to be a lot closer to feeling like a 5.11 whereas a 5.12d is nearly a 5.13. The moral of the story... Not all 5.12’s are equal!</p>
                <h3>What is the French Grading Scale?</h3>
                <p>The French Scale, or the Fontainebleau Scale, is widely used around the world and is most commonly seen outside of America. It is named after a famous outdoor bouldering area called Fontainebleau in France, just outside Paris. The French Grading Scale can be used to determine both sport climbs and boulders. Let's take a look at how to read grades on the French scale by examining the grade 7a+. The "7" refers to the difficulty of the climb, the higher the number the harder the climb. ​Just like the metric system, the French system arguably makes more sense than the American counterpart. The first number is from 1 to 9 and describes the difficulty of the climb. The "a" further describes the difficulty of the climb just as it does in the YDS. A climb graded on the French scale will have either an a, b, or c. The "+" is an added level of specificity that allows climbers to accurately grade their climbs. A 7a+, for instance, may feel closer to 7b for some climbers and closer to 7a for others.</p>
            </div>
            <Footer />
        </div>

    );
}

export default FAQPage;