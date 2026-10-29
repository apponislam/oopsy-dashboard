/**
 * Utility functions for resolving and formatting backend file and image URLs.
 */

const BASE_API_URL =
    process.env.NEXT_PUBLIC_BASE_API?.replace(/\/+$/, "") || "https://oopsyapi.apponislam.top";

/**
 * Returns a full URL for an image or file.
 * - If the path is already an absolute URL (starts with http:// or https://, data:, blob:), returns it as-is.
 * - Otherwise, prepends the backend base API URL from process.env.NEXT_PUBLIC_BASE_API.
 *
 * @param path - The image or file path string from backend or user input.
 * @param fallback - Optional fallback URL or placeholder if path is empty.
 * @returns Fully qualified URL string.
 */
export function getImageUrl(path?: string | null, fallback = ""): string {
    if (!path || typeof path !== "string" || path.trim() === "") {
        return fallback;
    }

    const trimmedPath = path.trim();

    // Already an absolute URL or data URL
    if (
        trimmedPath.startsWith("http://") ||
        trimmedPath.startsWith("https://") ||
        trimmedPath.startsWith("data:") ||
        trimmedPath.startsWith("blob:")
    ) {
        return trimmedPath;
    }

    // Ensure leading slash for the relative path
    const formattedPath = trimmedPath.startsWith("/") ? trimmedPath : `/${trimmedPath}`;

    return `${BASE_API_URL}${formattedPath}`;
}

/**
 * Alias for getImageUrl to handle any generic file type (PDF, documents, etc.)
 */
export const getFileUrl = getImageUrl;

/**
 * Checks if a given file path/URL is a PDF document.
 */
export function isPdfFile(path?: string | null): boolean {
    if (!path) return false;
    const cleanPath = path.split("?")[0].toLowerCase();
    return cleanPath.endsWith(".pdf");
}

/**
 * Checks if a given file path/URL is an image.
 */
export function isImageFile(path?: string | null): boolean {
    if (!path) return false;
    const cleanPath = path.split("?")[0].toLowerCase();
    return (
        cleanPath.endsWith(".jpg") ||
        cleanPath.endsWith(".jpeg") ||
        cleanPath.endsWith(".png") ||
        cleanPath.endsWith(".webp") ||
        cleanPath.endsWith(".svg") ||
        cleanPath.endsWith(".gif") ||
        cleanPath.endsWith(".avif")
    );
}

/**
 * Returns the file extension for a given path or URL.
 */
export function getFileExtension(path?: string | null): string {
    if (!path) return "";
    const cleanPath = path.split("?")[0];
    const dotIndex = cleanPath.lastIndexOf(".");
    return dotIndex !== -1 ? cleanPath.substring(dotIndex + 1).toLowerCase() : "";
}

/**
 * Returns the detected file category: "image", "pdf", "document", or "unknown".
 */
export function getFileType(path?: string | null): "image" | "pdf" | "document" | "unknown" {
    if (!path) return "unknown";
    if (isImageFile(path)) return "image";
    if (isPdfFile(path)) return "pdf";

    const ext = getFileExtension(path);
    if (["doc", "docx", "xls", "xlsx", "csv", "txt"].includes(ext)) {
        return "document";
    }

    return "unknown";
}

export default getImageUrl;
