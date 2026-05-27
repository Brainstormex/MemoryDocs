import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";

export async function fetchAndExtractPdfText(fileUrl: string): Promise<string> {
    try {
        // Fetch the PDF from the URL as a blob
        const response = await fetch(fileUrl);
        if (!response.ok) {
            throw new Error(`Failed to fetch PDF: ${response.statusText}`);
        }
        const blob = await response.blob();
        const arrayBuffer = await blob.arrayBuffer();

        // Load and parse the PDF using LangChain's PDFLoader
        const loader = new PDFLoader(new Blob([arrayBuffer]));
        const docs = await loader.load();

        // Concatenate all page content into a single string
        const pdfText = docs.map((doc) => doc.pageContent).join("\n");

        console.log("--- Extracted PDF Text ---");
        console.log(pdfText);
        console.log("--------------------------");

        return pdfText;
    } catch (error) {
        console.error("Error fetching/extracting PDF text:", error);
        throw error;
    }
}