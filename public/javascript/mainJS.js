
// Check and remove anything other than letters and then upper case them for input
const checkAndUpperCase = () => {
	let letter = document.getElementById("tSymbol").value;
	let check = /^[a-zA-Z]+$/.test(letter);
	if (check) {
		letter = letter.toUpperCase();
		document.getElementById("tSymbol").value = letter;
	} else {
		let wrongType = "";
		for (let i = 0 ; i < letter.length ; i++) {
			noLetter = /[a-zA-Z]/.test(letter.charAt(i));
			if (!noLetter) {
				let newLetter = letter.replace(letter.charAt(i), "");
				wrongType = letter.charAt(i);
				document.getElementById("tSymbol").value = newLetter;
			}
		}
		alert("Only letters please. You typed a " + wrongType + ".");
	}
}