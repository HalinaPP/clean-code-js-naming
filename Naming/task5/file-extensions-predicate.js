module.exports = class FileExtensionsPredicate {
    constructor(extensions) {
        this.extensions = extensions;
    }

    isFileNameHasOneOfExtensions(fileName) {
        return this.extensions.some((extension) => {
            return fileName.toLowerCase().endsWith(extension);
        });
    }
};
