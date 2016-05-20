//costume directive
var compareTo = function() {
	return {
		require: "ngModel",
		scope: {
			otherModelValue: "=compareTo"
		},
		link: function(scope, element, attributes, ngModel) {

			ngModel.$validators.compareTo = function(modelValue) {
				return modelValue === scope.otherModelValue.$modelValue;
			};

			scope.$watch("otherModelValue", function() {
				ngModel.$validate();
			});
		}
	};
};

myApp.directive("compareTo", compareTo);

var diffTo = function() {
	return {
		require: "ngModel",
		scope: {
			otherModelValue: "=diffTo"
		},
		link: function(scope, element, attributes, ngModel) {

			ngModel.$validators.diffTo = function(modelValue) {
				return modelValue !== scope.otherModelValue.$modelValue;
			};

			scope.$watch("otherModelValue", function() {
				ngModel.$validate();
			});
		}
	};
};

myApp.directive("diffTo", diffTo);

myApp.directive('fileModel', ['$parse', function ($parse) {
	return {
		restrict: 'A',
		link: function(scope, element, attrs) {
			var model = $parse(attrs.fileModel);
			var modelSetter = model.assign;

			element.bind('change', function(){
				scope.$apply(function(){
					modelSetter(scope, element[0].files[0]);
				});
			});
		}
	};
}]);

myApp.directive('targetBlank', function() {
	return {
		compile: function(element) {
			var elems = (element.prop("tagName") === 'A') ? element : element.find('a');
			elems.attr("target", "_blank");
		}
	};
});

