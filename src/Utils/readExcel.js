import XLSX from 'xlsx';

export async function extractJSON(file) {
	const reader = new FileReader();
	const rABS = !!reader.readAsBinaryString;

	let data = null;

	if (rABS) {
		reader.readAsBinaryString(file);
	} else {
		reader.readAsArrayBuffer(file);
	}

	return new Promise((resolve, reject) => {
		reader.onload = (e) => {
			/* Parse data */
			const bstr = e.target.result;
			const wb = XLSX.read(bstr, {
				type: rABS ? 'binary' : 'array',
				bookVBA: true,
			});
			/* Get first worksheet */
			const wsname = wb.SheetNames[0];
			const ws = wb.Sheets[wsname];
			/* Convert array of arrays */
			data = XLSX.utils.sheet_to_json(ws);

			resolve(data);
		};

		reader.onerror = () => {
			reader.abort();
			reject(new Error('Terjadi kesalahan ketika memindai file.'));
		};
	});
}
