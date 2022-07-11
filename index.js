async function getFolderFiles({ name, path }, root, depth) {
	// Get files and folders
	const contents = await fetch(
		`https://api.github.com/repos/DoctorBracewell/archive/contents/${path}`
	).then((res) => res.json());

	// Create a header for a folder
	const details = document.createElement("details");
	const summary = document.createElement("summary");
	const header = document.createElement(`h${depth + 1 > 6 ? "p" : depth + 1}`);
	details.style.marginLeft = `${depth * 20}px`;
	header.textContent = name + ":";

	summary.appendChild(header);
	details.appendChild(summary);

	// Recursively add all the folders within the current folder
	const directories = contents.filter((content) => content.type === "dir");
	for (const directory of directories) {
		getFolderFiles(directory, details, depth + 1);
	}

	// Display all the files within a folder
	const wrapper = document.createElement("p");
	const files = contents.filter((content) => content.type === "file");

	for (const file of files) {
		const anchorWrapper = document.createElement("p");
		const anchor = document.createElement("a");
		anchor.setAttribute("href", file.path);
		anchor.style.marginLeft = `${(depth + 1) * 20}px`;
		anchor.textContent = file.name;

		anchorWrapper.appendChild(anchor);
		wrapper.appendChild(anchorWrapper);
	}

	details.appendChild(wrapper);
	root.appendChild(details);
}

const contents = await fetch(
	`https://api.github.com/repos/DoctorBracewell/archive/contents/`
).then((res) => res.json());

const directories = contents.filter((content) => content.type === "dir");

for (const directory of directories) {
	getFolderFiles(directory, document.querySelector("#archive"), 1);
}
