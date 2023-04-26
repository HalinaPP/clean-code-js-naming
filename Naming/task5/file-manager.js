const path = require('path');
const fs = require('fs');

const PropertyUtil = require('./thirdparty/property-util');
const InvalidFileTypeError = require('./thirdparty/invalid-file-type-error');
const InvalidDirectoryException = require('./thirdparty/invalid-directory-exception');
const FileExtensionsPredicate = require('./file-extensions-predicate');

const IMAGES_EXTENSIONS_ALLOWED  = ['jpg', 'png'];
const DOCUMENTS_EXTENSIONS_ALLOWED  = ['pdf', 'doc'];

module.exports = class FileManager {
    constructor() {
        this.basePath = PropertyUtil.loadProperty('basePath');
    }

    getAbsoluteFilePath(fileName) {
        this.validateFileType(fileName);
        const directoryPath = this.basePath + path.sep;
        return path.resolve(directoryPath, fileName);
    }

    getAllImages() {
        return this.getFilesByExtensions(this.basePath, IMAGES_EXTENSIONS_ALLOWED );
    }

    getAllDocumentFiles() {
        return this.getFilesByExtensions(this.basePath, DOCUMENTS_EXTENSIONS_ALLOWED );
    }

    validateFileType(fileName) {
        if (this.isInvalidFileType(fileName)) {
            throw new InvalidFileTypeError('File type not Supported: ' + fileName);
        }
    }

    isInvalidFileType(fileName) {
        return this.isNotImage(fileName) && this.isNotDocument(fileName);
    }

    isNotImage(fileName) {
        const imageExtensions = new FileExtensionsPredicate(IMAGES_EXTENSIONS_ALLOWED);
        return !imageExtensions.isFileNameHasOneOfExtensions(fileName);
    }

    isNotDocument(fileName) {
        const documentExtensions = new FileExtensionsPredicate(DOCUMENTS_EXTENSIONS_ALLOWED);
        return !documentExtensions.isFileNameHasOneOfExtensions(fileName);
    }

    getFilesByExtensions(directoryPath, allowedExtensions) {
        const fileExtensions = new FileExtensionsPredicate(allowedExtensions);
        return this.getDirectoryFiles(directoryPath).filter((file) => {
            return fileExtensions.isFileNameHasOneOfExtensions(file);
        });
    }

    getDirectoryFiles(directoryPath) {
        const directoryStats = fs.statSync(directoryPath);
        this.validateDirectory(directoryStats, directoryPath);
        return fs.readdirSync(directoryPath);
    }

    validateDirectory(stats, path) {
        if (this.isNotDirectory(stats)) {
            throw new InvalidDirectoryException('Invalid directory found: ' + path);
        }
    }

    isNotDirectory(stats) {
        return !stats.isDirectory();
    }
};
