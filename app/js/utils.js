'use strict';

let utils = {

	loadJSON(path, success, error) {
		let xhr = new XMLHttpRequest();
		xhr.onreadystatechange = () => {
			if (xhr.readyState === XMLHttpRequest.DONE) {
				if (xhr.status === 200) {
					if (success)
						success(JSON.parse(xhr.responseText));
				} else {
					if (error)
						error(xhr);
				}
			}
		};
		xhr.open("GET", path, true);
		xhr.send();
	},

	dom: {
		findAncestor(elem, className) {
			while ((elem = elem.parentElement) && !elem.classList.contains(className));
			return elem;
		},
		getAttributeValue(elem, attributeName) {
			if(attributeName in elem.attributes) {
				return elem.attributes[attributeName].nodeValue;
			}
		},

		hide(elem) {
			elem.classList.add('hidden');
		},

		show(elem) {
			elem.classList.remove('hidden');
		}
	},
};