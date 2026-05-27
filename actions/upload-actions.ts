'use server'

import { fetchAndExtractPdfText } from "@/app/lib/langchain";
import { generateSummaryFromOpenAi } from "@/app/lib/openai";

export async function generatePdfSummary(uploadResponse: {
    serverData: {
        userId: string;
        file: {
            url: string;
            name: string;
        };
    }
}[]) {
    if (!uploadResponse) {
        return {
            success: false,
            message: "File Upload failed",
            data: null
        }
    }

    const { serverData: { userId, file: { url: pdfUrl, name: fileName } } } = uploadResponse[0];
    if (!pdfUrl) {
        return {
            success: false,
            message: "File Upload failed",
            data: null
        }
    }

    try {
        // Extract and log PDF text using LangChain PDFLoader
        const pdfText = await fetchAndExtractPdfText(pdfUrl);
        console.log(`PDF text extracted for user ${userId}, file: ${fileName}`);
        let summary;
        try {
            summary = await generateSummaryFromOpenAi(pdfText);
            console.log(`Summary generated for user ${userId}, file: ${fileName}`);
            console.log(summary)
        } catch (error) {
            console.error("Error generating summary:", error);
            return {
                success: false,
                message: "Failed to generate summary. Please try again.",
                data: null
            }
        }
        if (!summary) {
            return {
                success: false,
                message: "Failed to generate summary. Please try again.",
                data: null
            }
        }
        return {
            success: true,
            message: "PDF text extracted successfully",
            data: { pdfText, fileName, userId }
        }
    } catch (error) {
        console.error("Error extracting PDF text:", error);
        return {
            success: false,
            message: "Failed to extract PDF text. Please try again.",
            data: null
        }
    }
}
