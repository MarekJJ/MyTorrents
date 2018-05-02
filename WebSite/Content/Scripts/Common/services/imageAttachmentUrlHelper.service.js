angular
    .module('sfcCommon')
    .factory('imageAttachmentUrlHelper', ['BackendRootUrl', function (BackendRootUrl) {
        return {
            getImageUrl: function (urlRoot, imageAttachmentId) {
                if (imageAttachmentId) {
                    return BackendRootUrl + urlRoot + imageAttachmentId;
                }
                else {
                    return this.getPlaceholderUrl();
                }
            },

            getPlaceholderUrl: function () {
                return BackendRootUrl + 'Content/Images/no-image-placeholder.png';
            }
        }
    }]);