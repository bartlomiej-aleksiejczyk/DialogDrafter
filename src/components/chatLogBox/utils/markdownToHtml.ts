import hljs from "highlight.js";
import Dompurify from "dompurify";
import * as marked from "marked";

export const markdownToHtml = (data: string) => {
	const renderer = {
		code: (code, language) => {
			const validLanguage = hljs.getLanguage(language) ? language : "plaintext";
			return `
				<div class="relative rounded-lg group">
					<div class="bg-gray-800 p-2 rounded-t-md">		
						Language: ${validLanguage}
						  <button class="btn btn-sm absolute top-0 right-0 m-2 opacity-0 group-hover:opacity-100" 
						  onclick="navigator.clipboard.writeText(\`${code}\`)">Copy</button>
					</div>
					
					<div class="p-2 rounded-b-md bg-gray-800">
						  <pre><code class="${validLanguage} text-base p-1">${code}</code></pre>
					</div>
				</div>
			`;
		},
	};

	marked.use({ renderer });
	return marked.parse(Dompurify.sanitize(data));
};
