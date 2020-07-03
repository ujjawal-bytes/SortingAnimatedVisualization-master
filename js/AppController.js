var appController = (function(modelController, viewController, QuickSort, MergeSort, HeapSort) {
	var MIN_SIZE = 10, MAX_SIZE = 200;
	var currSize;
	var animationDelay = 50;
	var domElements;
	var disabled = false;
	var algos = {};
	var selectedAlgo = 1;

	
	var Counters = (function(viewController, modelController, animationDelay) {
		var COLORS = viewController.COLORS;
		var colorCounter = 0;
		var animationDelay;

		function Counter(i) {
			this.currIdx = i;
			this.color = (colorCounter % COLORS.length);
			colorCounter++;
			this.destroyed = false;
			if (modelController.getItem(this.currIdx)) {
				viewController.setItemColor(this.currIdx, modelController.getItem(this.currIdx) , COLORS[this.color]);
			}
		}
		Counter.prototype.set = function(i) {
			return new Promise(function(resolve, reject) {
				if (this.destroyed) {
					return resolve();
				}
				if (modelController.getItem(this.currIdx)) {
					viewController.setItemColor(this.currIdx, modelController.getItem(this.currIdx));
				}
				this.currIdx = i;
				if (modelController.getItem(this.currIdx)) {
					viewController.setItemColor(this.currIdx, modelController.getItem(this.currIdx) , COLORS[this.color]);
				}
				setTimeout(function() {
					resolve();
				}.bind(this), Math.floor(animationDelay / 2));
			}.bind(this));
		}
		Counter.prototype.get = function() {
			return this.currIdx;
		}
		Counter.prototype.destroy = function() {
			if (modelController.getItem(this.currIdx)) {
				viewController.setItemColor(this.currIdx, modelController.getItem(this.currIdx));
			}
			this.destroyed = true;
		}
		return {
			Counter: Counter
		};
	})(viewController, modelController, animationDelay);

	function setupListeners() {
		viewController.domElements.SIZE_INPUT.addEventListener('change', function(event) {
			if (!disabled) {
				onSizeChange(event.target.value);
			}
			
		});
		viewController.domElements.GENERATE_NEW.addEventListener('click', function(event) {
			if (!disabled) {
				reset();
			}
		});
		viewController.domElements.SORT.addEventListener('click', function(event) {
			if (!disabled) {
				sort();
			}
		});
		viewController.domElements.REVERSE.addEventListener('click', function(event) {
			if (!disabled) {
				reverse();
			}
		});
		viewController.domElements.SHUFFLE.addEventListener('click', function(event) {
			if (!disabled) {
				shuffle();
			}
		});
		var c = viewController.domElements.ALGOS();
		for (var i = 0 ; i < c.length ; i++) {
			c[i].addEventListener('click', function(event) {
				if (!disabled) {
					var id = event.target.id;
					onAlgoChange(id.substring(id.length - 1));
				}
			});
		}

	}
	function reverse() {
		modelController.reverse();
		modelController.resetItems();
		viewController.reset(modelController.getItems());
	}
	function shuffle() {
		modelController.shuffle();
		modelController.resetItems();
		viewController.reset(modelController.getItems());
	}
	function onAlgoChange(id) {
		viewController.changeAlgo(selectedAlgo, +id);
		selectedAlgo = +id;
	}

	function onSizeChange(size) {
		currSize = +size;
		// animationDelay = 40 + (MAX_SIZE - size);
		animationDelay = 50;
		reset();
	}
	function sleep(duration) {
		var curr = Date.now();
		while (Date.now() < curr + duration);
	}
	function swap(i, j) {
		return new Promise(function(resolve, reject) {
			modelController.swap(i, j);
			viewController.update(i, modelController.getItem(i));
			viewController.update(j, modelController.getItem(j));
			setTimeout(function() {
				resolve();
			}, animationDelay);
		});
	}
	function reset() {
		modelController.reset(currSize);
		var items = modelController.getItems();
		viewController.reset(items);
	}
	function justSorted() {
		viewController.justSorted();
	}

	async function sort() {
		disabled = true;
		modelController.resetItems();
		viewController.reset(modelController.getItems());
		viewController.disable();
		await modelController.sort(selectedAlgo, swap, Counters.Counter);
		await justSorted();
		viewController.enable();
		disabled = false;
	}
	function init() {
		algos = modelController.algos;
		viewController.init(modelController.MAX_ITEM, MIN_SIZE, MAX_SIZE, algos, selectedAlgo);
		
		var size = viewController.domElements.SIZE_INPUT.value;
		console.log("Abhishek " + size);
		onSizeChange(size);
		domElements = viewController.domElements;

		setTimeout(function() {
			setupListeners();
		}, 100);
	}
	return {
		init: init,
		sort: sort
	};
})(modelController, viewController, QuickSort, MergeSort, HeapSort);