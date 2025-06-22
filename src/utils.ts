export const stringToDataURL = (str: string): Promise<string> => {
	return new Promise((resolve, reject) => {
		const fileReader = new FileReader();
		fileReader.addEventListener('load', () => resolve(fileReader.result as string));
		fileReader.addEventListener('error', () => reject(fileReader.error));
		fileReader.readAsDataURL(new Blob([str], { type: 'text/plain;charset=utf-8' }));
	});
};

export const removeExtension = (filename: string): string => {
	const lastDotIndex = filename.lastIndexOf('.');
	if (lastDotIndex === -1) return filename;
	return filename.substring(0, lastDotIndex);
};
