// ---------------------------------- LOADING PAGE ---------------------------------- //
const wait = (delay = 0) =>
  new Promise(resolve => setTimeout(resolve, delay));

const setVisible = (elementOrSelector, visible) => 
  (typeof elementOrSelector === 'string'
    ? document.querySelector(elementOrSelector)
    : elementOrSelector
  ).style.display = visible ? 'block' : 'none';

setVisible('.outer-page', false);
setVisible('#loading', true);

document.addEventListener('DOMContentLoaded', () =>
  wait(8000).then(() => {
    setVisible('.outer-page', true);
    setVisible('#loading', false);
  }));
  
// ---------------------------------- CALCULATING ---------------------------------- //
//removing all past symptoms entry to only get the latest and convert to array
var symptomsList = document.getElementsByClassName("symptoms-list");
if (symptomsList.length > 1) {
	//"backward iteration" aka reverse loop --> i decreases as length changes due to .remove() 
	for (var i = symptomsList.length - 2; i >= 0; i--) {
		symptomsList[i].remove();
	}
}

// convert string to array
var symptoms = symptomsList[0].textContent;
var symptoms_array = symptoms.split(",");
/*for (var i = 0; i < symptoms_array.length; i++) {
	symptomsList.innerHTML = symptomsList[i];
}*/

//condition arrays for symptoms and points
var migraine_symptoms = ["temple pain", "blind spots", "sensitivity", "hormonal changes", "dizziness"]
var sinusitis_symptoms = ["sinus pain", "runny nose", "sore throat", "fever", "cough"];
var cluster_symptoms = ["pain on one side of head", "pain in one eye", "swelling in one eye", "runny nose on one side", "sensitivity"];
var tension_symptoms = ["contractions", "tender scalp", "forehead pain", "stress", "cold"]
var eyestrain_symptoms = ["blurry", "swollen eyes", "sore eyes", "eye headache", "sensitivity"];
var hemicrania_symptoms = ["ptosis", "miosis", "pain on one side of head", "swollen eyes", "sensitivity"];
var traumatic_symptoms = ["depression", "memory", "dizziness", "insomnia", "sensitivity"]
var hormone_symptoms = ["hormonal changes", "cravings", "urination", "pain on one side of head", "sensitivity"];
var rebound_symptoms = ["medications", "depression", "irritability", "runny nose", "memory"];

//total points global variables --> SHOULD WE INCLUDE THE DESCRIPTIONS/CAUSES/TREATMENT IN THESE VARIABLES TOO?
var total_migraine_points = { condition: "Migraine", score: 0, descript: "<u>Description:</u> A severe headache of varying intensity - usually a throbbing pain on the side(s) of your head. Many people with migraines experience disturbances called auras that indicate a migraine might be coming.", causes:"<u>Causes</u>: Migraine headaches occur due to changes in brainstem interactions or chemical imbalance. These can occur due to hormonal changes in women or hormonal medications, along with stress, sleep changes, and exhaustion.", recovery:"<u>Steps toward recovery</u>: <ol><li>Pain Relief: <ul><li>Medication such as acetaminophen (Tylenol), Aspirin, ibuprofen (Advil, Motrin)</li><li>Stronger pain meds such as Triptan and Dihydroergotamine (used for migraines specifically)</li></ul></li><li>Preventative measures/medications: <ul><li>Blood pressure-lowering medications and antidepressants</li></ul></li></ol>", doctor:"<u>When to call a doctor</u>: If you regularly experience headaches but your patterns seem off. If you experience a sudden, severe “thunderclap” headache or a headache accompanied by stiff neck, mental confusion, seizures or double vision, seek medical care immediately.", sources:"<a href='https://www.mayoclinic.org/diseases-conditions/migraine-headache/symptoms-causes/syc-20360201' target='_blank'>Sources</a>" };
var total_sinus_points = { condition: "Sinusitis", score: 0, descript: "<u>Description:</u> The inflammation of the paranasal sinuses, which are located behind the face and lead to the nasal cavity. Acute sinusitis usually lasts 7-10 days but can take up to 4 weeks. It becomes chronic if it lasts more than 12 weeks or returns more than 3x per year.", causes:"<u>Causes</u>: The lining of the sinuses produce mucus. Sinusitis occurs when this fluid accumulates and causes inflammation, along with the growth of germs. The most common cause of this buildup and inflammation is viruses, but it can also be caused by bacteria, allergens, and air pollutants.", recovery:"<u>Steps toward recovery</u>: <ol><li>Pain Relief: <ul><li>Acetaminophen or ibuprofen</li></ul></li><li>Home remedies: <ul><li>Nasal irrigation by clearing the nasal passages with salt water or saline</li><li>Steam inhalation by placing a warm towel on the area of pain or inhaling steam from a bowl of hot water (tip: eucalyptus leaves or essential oil boiled in water produce steam that is known to clear the nasal passages)</li></ul></li></ol>", doctor:"<u>When to call a doctor</u>: If you develop a fever that lasts 3-4 days or is higher than 101.5° F, or if you experience swelling around the eyes or any other severe symptoms that are not solved with over-the-counter medicine, please contact your doctor.", sources:"<a href='https://www.medicalnewstoday.com/articles/149941#_noHeaderPrefixedContent' target='_blank'>Sources</a>" };
var total_cluster_points = { condition: "Cluster Headache", score: 0, descript: "<u>Description:</u> One of the most painful and intense headaches, usually located around one eye or side of the head. Attacks can occur frequently between a couple weeks and months, usually followed by “remission periods” in which the attacks stop occurring.", causes:"<u>Causes</u>: Cluster headaches can be associated with disruption of the hypothalamus, or the body’s “clock”. They aren’t usually triggered by hormone imbalances or stress.", recovery:"<u>Steps toward recovery</u>: <ol><li>Pain Relief: <ul><li>Briefly inhaling through an oxygen mass can provide pain relief</li><li>medications such as Triptans.</li></ul></li><li>Preventative measures: <ul><li>Sticking to a healthy sleep schedule and avoiding alcohol</li><li>the calcium channel blocking agent verapamil (Calan, Verelan) are often used to prevent oncoming cluster headaches</li></ul></li></ol>", doctor:"<u>When to call a doctor</u>: If you regularly experience headaches but your patterns seem off. If you experience a sudden, severe “thunderclap” headache or a headache accompanied by stiff neck, mental confusion, seizures or double vision, seek medical care immediately.", sources:"<a href='https://www.mayoclinic.org/diseases-conditions/cluster-headache/diagnosis-treatment/drc-20352084' target='_blank'>Sources</a>" };
var total_tension_points = { condition: "Tension Headache", score: 0, descript: "<u>Description:</u> The most common types of headaches, Tension headaches, which can range from moderate to intense pain, are . They are usually located behind/around the eye area, around the head, or neck. They usually come in episodes that occur a couple times a month, though sometimes they can be chronic.", causes:"<u>Causes</u>: Though the cause is still unknown, tension headaches are said to occur due to muscle contractions in the head and neck regions, which can be caused by different activities or stress factors. Other triggers of tension headaches can be alcohol, a cold, poor posture, and lack of sleep.", recovery:"<u>Steps toward recovery</u>: <ol><li>Medications: <ul><li>Over the counter medications such as aspirin, ibuprofen (Advil, Motrin IB, others) and naproxen (Aleve). These can also be used in combination to help with pain relief</li></ul></li><li>Preventative measures: <ul><li>Tricyclic antidepressants are commonly used to prevent tension headaches</li></ul></li><li>Home Remedies: <ul><li>Reducing levels of stress</li><li>Practicing good posture</li><li>Heat or cold packs can help with pain relief</li></ul></li></ol>", doctor:"<u>When to call a doctor</u>: If you regularly experience headaches but your patterns seem off. If you experience a sudden, severe “thunderclap” headache or a headache accompanied by stiff neck, mental confusion, seizures or double vision, seek medical care immediately. If you experience a head injury followed by an ongoing headache, seek medical care.", sources:"<a href='https://www.mayoclinic.org/diseases-conditions/tension-headache/symptoms-causes/syc-20353977' target='_blank'>Sources</a>" };
var total_eyestrain_points = { condition: "Eyestrain", score: 0, descript: "<u>Description:</u> A common condition of eyes becoming tired after overuse, which can include excessive use of computer screens or driving long distances.", causes:"<u>Causes</u>: Eyestrain is usually caused by doing too much of regular daily activities. These include looking at digital devices throughout the day without break, reading without pausing, being exposed to glare or very bright light, stress and fatigue, and driving long distances with intense concentration.", recovery:"<u>Steps toward recovery</u>: <ol><li>Medications: <ul><li>Artificial tears help reduce the dryness</li></ul></li><li>Eye Strain is best combatted through lifestyle changes: <ul><li>Adjusting lighting when you use computers or watch TV</li><li>Taking breaks. One way is the 20-20-20 method: Every 20 minutes, look at something 20 feet away for at least 20 seconds.</li><li>Consider eyewear such as computer glasses</li></ul></li></ol>", doctor:"<u>When to call a doctor</u>: If none of these recovery steps help, go see an eye doctor to rule out an underlying eye condition.", sources:"<a href='https://www.mayoclinic.org/diseases-conditions/eyestrain/diagnosis-treatment/drc-20372403' target='_blank'>Sources</a>" };
var total_hemicrania_points = { condition: "Hemicrania", score: 0, descript: "<u>Description:</u> A chronic and persistent headache characterized by continuous pain of varying severity. It always occurs on the same side of the face/head, and may last for more than 3 months. Most patients experience attacks of increased pain three to five times per 24-hour cycle.", causes:"<u>Causes</u>: unknown", recovery:"<u>Steps toward recovery</u>: <ul><li>Nonsteroidal anti-inflammatory drugs (indomethacin, celecoxib)</li><li>Acid-suppression medicine</li><li>Amitriptyline and other tricyclic antidepressants</li></ul>", doctor:"<u>When to call a doctor</u>: If pain becomes intolerable and relief of symptoms is needed, you should visit a doctor in order to get a professional prognosis and medical treatment.", sources:"<a href='https://www.ninds.nih.gov/disorders/all-disorders/hemicrania-continua-information-page' target='_blank'>Sources</a>" };
var total_traumatic_points = { condition: "Trauma Headache", score: 0, descript: "<u>Description:</u> A headache that develops within seven days of a head injury or after regaining consciousness. It usually resolves within three months, however, in 18-65% of cases, it may last longer.", causes:"<u>Causes</u>: Most patients with mild PTH do not need extensive testing other than a good history and neurologic exam. With more severe injuries, a CT or an MRI scan might be done to rule out a brain bleed.", recovery:"<u>Steps toward recovery</u>: <ol><li>Medications: <ul><li>Anti-inflammatories or pain medicines, including those for migraine (triptans)</li></ul></li><li>Preventative Measures: <ul><li>Antidepressants, blood pressure pills, and anti-seizure medicines</li></ul></li><li>Non-drug treatments: <ul><li>Physical therapy, biofeedback/relaxation therapy, nerve stimulators, and cognitive-behavioral therapies</li></ul></li></ol>", doctor:"<u>When to call a doctor</u>: Most patients with mild PTH do not need extensive testing other than a good history and neurologic exam. With more severe injuries, a CT or an MRI scan might be done to rule out a brain bleed.", sources:"<a href='https://americanmigrainefoundation.org/resource-library/post-traumatic-headache/' target='_blank'>Sources</a>" };
var total_hormone_points = { condition: "Hormone Headache", score: 0, descript: "<u>Description:</u> In women, fluctuating hormone levels are a major contributing factor in chronic headaches and menstrual migraines. Hormone levels change during the menstrual cycle, pregnancy, and menopause, and are also affected by oral contraceptives and hormone replacement therapies.", causes:"<u>Causes</u>: The menstrual cycle, pregnancy, perimenopause and menopause, and oral contraceptives and hormone replacement therapy cause changes in estrogen and progesterone levels.", recovery:"<u>Steps toward recovery</u>: <ol><li>Medications: <ul><li>Over-the-counter nonsteroidal anti-inflammatory medications (NSAIDs), such as ibuprofen</li><li>Triptans - migraine-specific medication</li></ul></li><li>Preventative Measures: <ul><li>Beta blockers</li><li>Anticonvulsants</li><li>Calcium channel blockers</li></ul></li><li>Home Remedies: <ul><li>Drink plenty of water to stay hydrated.</li><li>Lie down in a dark, quiet room.</li><li>Place an ice bag or cold cloth on your head.</li><li>Massage the area where you feel pain.</li><li>Perform deep breathing or other relaxation exercises.</li></ul></li></ol>", doctor:"<u>When to call a doctor</u>: Seek emergency medical attention immediately if you experience a sudden, severe headache and symptoms such as dizziness, stiff neck, rash, shortness of breath, loss of vision, AND any other drastic symptoms.", sources:"<a href='https://www.healthline.com/health/hormonal-headaches#symptoms' target='_blank'>Sources</a>"  };
var total_rebound_points = { condition: "Rebound Headache", score: 0, descript: "<u>Description:</u> A headache that results from taking analgesic (pain) medication too often to relieve your headache. The result is a daily or near daily headache for which the current medications you are taking become less and less effective.", causes:"<u>Causes</u>: Overuse of medications such as aspirin, sinus relief medications, acetaminophen, nonsteroidal anti-inflammatory drugs (or NSAIDs, such as ibuprofen and naproxen), sedatives for sleep, codeine and prescription narcotics, and OTC combination headache remedies containing caffeine.", recovery:"<u>Steps toward recovery</u>: <ol><li>Preventative Measures: <ul><li>Always follow the labeling instructions of medications and the instructions of your doctor.</li><li>Use immediate relief (acute) pain-relieving medications on a limited basis, only when necessary - not more than once or twice a week, unless instructed otherwise by your healthcare provider.</li><li>Before taking any OTC medication, ask your healthcare provider if it has any potential for interacting with your current prescription medications.</li><li>Avoid caffeine-containing products (e.g. coffees, teas, soft drinks and chocolate) while taking a pain-relieving medication</li></ul></li><li>Make a recovery plan: <ol><li>Stopping the overuse of medication(s) to break the headache cycle.</li><li>Develop a plan for using preventive medication. Preventive medications include beta blockers, tricyclic antidepressants, anticonvulsants, calcium channel blockers and NSAIDs.</li><li>Allow use of acute medication with limits.</li></ol></li></ol>", doctor:"<u>When to call a doctor</u>: Visit your doctor to see if your medications should be stopped quickly or more gradually over weeks or months. Also, visit a headache specialist to start new preventive treatment.", sources:"<a href='https://my.clevelandclinic.org/health/diseases/6170-medication-overuse-headaches' target='_blank'>Sources</a>" };

function check_condition() {
	//loop through each element in the symptoms array (x will be the index number)
	for (x in symptoms_array) {
		//for each index number, loop through the condition symptoms (y will be the index number)
		checkCondition(x, migraine_symptoms, total_migraine_points, [5, 4, 3, 2, 1]);
		checkCondition(x, sinusitis_symptoms, total_sinus_points, [5, 5, 2, 2, 1]);
		checkCondition(x, cluster_symptoms, total_cluster_points, [4, 4, 3, 3, 1]);
		checkCondition(x, tension_symptoms, total_tension_points, [5, 4, 4, 1, 1]);
		checkCondition(x, eyestrain_symptoms, total_eyestrain_points, [4, 3, 3, 3, 2]);
		checkCondition(x, hemicrania_symptoms, total_hemicrania_points, [5, 5, 2, 2, 1]);
		checkCondition(x, traumatic_symptoms, total_traumatic_points, [5, 3, 3, 3, 1]);
		checkCondition(x, hormone_symptoms, total_hormone_points, [5, 4, 3, 2, 1]);
		checkCondition(x, rebound_symptoms, total_rebound_points, [5, 4, 4, 1, 1]);
	}
}
check_condition();
order_points();

//points are already ordered so the index number of the symptom will be the index number of it's corresponding points --> add the points to total points for that condition
function condition(totalPoints, index, pointsArr) {
	totalPoints.score += pointsArr[index];
}

function checkCondition(x, symptoms, totalPoints, pointsArr) {
	for (y in symptoms) {
		//if the two symptoms match, it will call the corresponding function with the parameter being the index number that matched
		if (symptoms_array[x] == symptoms[y]) {
			condition(totalPoints, y, pointsArr);
		}
	}
}
	
function order_points() {
	var points = [total_migraine_points, total_sinus_points, total_cluster_points, total_tension_points, total_eyestrain_points, total_hemicrania_points, total_traumatic_points, total_hormone_points, total_rebound_points];

	/*  1. Compare Object "a" and Object "b" in array "points" 
		2. If the score of b > score of a, sort b before a, 
			else if the score of b < score of a, sort a before b
			else, do not change the order                            */
	points.sort((a, b) => (b.score > a.score) ? 1 : -1)

	for (var i = 0; i < 5; i++) {
		if (points[i].score == 0) {
			continue;
		} //${i+1}.
		else {
			var results_page = document.getElementById("results");
			var collapsible_row = `<button class="collapsible"> ${points[i].condition} (${Math.round(points[i].score * 100 / 15)}%)</button><div class="content"><p>${points[i].descript}</p></hr><p>${points[i].causes}</p><p>${points[i].recovery}</p><p>${points[i].doctor}</p>${points[i].sources}</div>`
			var $div = document.createElement('div');
			$div.className = "condition";
			$div.innerHTML = collapsible_row;
			results_page.appendChild($div);

			var results_form = document.getElementById("results-form");
			var input = `<input type="hidden" name="condition" value="${points[i].condition} (${Math.round(points[i].score * 100 / 15)}%)">`
			var $div_form = document.createElement('div');
			$div_form.innerHTML = input;
			results_form.appendChild($div_form);

		}
	}
};
