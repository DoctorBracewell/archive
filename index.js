const root = document.querySelector("#content");

async function getFolderFiles({ name, path }, depth) {
	const contents = await fetch(
		`https://api.github.com/repos/DoctorBracewell/archive/contents/${path}`
	).then((res) => res.json());

	const header = document.createElement(`h${depth + 1 > 6 ? "p" : depth + 1}`);
	header.style.marginLeft = `${depth * 30}px`;
	header.textContent = name + ":";
	root.appendChild(header);

	const directories = contents.filter((content) => content.type === "dir");
	for (const directory of directories) {
		getFolderFiles(directory, depth + 1);
	}

	const wrapper = document.createElement("p");
	const files = contents.filter((content) => content.type === "file");
	for (const file of files) {
		const anchor = document.createElement("a");
		anchor.setAttribute("href", file.path);
		anchor.style.marginLeft = `${(depth + 1) * 30}px`;
		anchor.textContent = file.name;

		wrapper.appendChild(anchor);
	}

	root.appendChild(wrapper);
}

getFolderFiles(
	{
		name: "Archive",
		path: "",
	},
	0
);
