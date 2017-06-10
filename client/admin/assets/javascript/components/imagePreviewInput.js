
function ImagePreviewInputController($scope, $element, $attrs) {
    var ctrl = this;

    var input = $element[0].querySelectorAll('input')[0];
    var img = $element[0].querySelectorAll('img')[0];

    input.addEventListener('change', function(e) {
        var url = URL.createObjectURL(input.files[0]);
        img.setAttribute('src', url);
    });

    ctrl.$onChanges = function(changesObj) {
        if (changesObj.item) {
            input.value = '';
            if (changesObj.item.currentValue && !changesObj.item.currentValue.pic) {
                img.setAttribute('src', '');
            }
        }
    }
}

angular.module('gccweb-admin').component('imagePreviewInput', {
    templateUrl: 'assets/templates/imagePreviewInput.html',
    controller: ImagePreviewInputController,
    bindings: {
        label: '@',
        item: '<',
        name: '@'
    }
});
