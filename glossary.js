const xmlhttp = new XMLHttpRequest();
xmlhttp.onload = async function () {
	const conditionsObj = await JSON.parse(this.responseText);
	const glossaryContainer = document.getElementById("glossary");
	
	for (const condition in conditionsObj) {
		const glossaryItem = document.createElement("div");
		glossaryItem.className = "glossary-item";
		
		let conditionName = document.createElement("h2");
		conditionName.className = "condition-name";
		conditionName.innerHTML = condition;
		
		let glossaryContent = document.createElement("div");
		glossaryContent.className = "glossary-content";
		
		for (const section in conditionsObj[condition]) {
			const span = document.createElement("span");
			const link = document.createElement("a");
			if (section === "source") {
				link.innerHTML = "Source: " + conditionsObj[condition][section];
				glossaryContent.appendChild(document.createElement("br"));
				glossaryContent.appendChild(link);
			} else {
				span.innerHTML = conditionsObj[condition][section];
				glossaryContent.appendChild(span);
			}
		}
		
		glossaryItem.appendChild(conditionName);
		glossaryItem.appendChild(glossaryContent);
		
		glossaryItem.addEventListener("click", function () {
			glossaryContent = this.children[1];
			conditionName = this.children[0];
			if (glossaryContent.style.maxHeight) {
				glossaryContent.style.maxHeight = null;
				glossaryContent.style.padding = "0";
				conditionName.style.backgroundColor = "#fefefe";
			} else {
				glossaryContent.style.padding = "2em";
				glossaryContent.style.maxHeight = `calc(${glossaryContent.scrollHeight}px + 4em)`;
				conditionName.style.backgroundColor = "#A4BCC4";
			}
		});
	
		glossaryContainer.appendChild(glossaryItem);
	}
}
xmlhttp.open("GET", "web-scraper/conditions.json");
xmlhttp.send();