var viewController = (function() {
	var TOTAL_WIDTH = 800, TOTAL_HEIGHT = 600;
	var MAX_ITEM;
	var DEFAULT_ITEM_COLOR = "rgba(169, 92, 232, 0.8)";
	var DEFAULT_ITEM_COLOR1 = "rgba(66, 134, 244, 0.8)";
	var COLORS = ["#09edd2", "#ed95d8", "#f9f984", "#adb6c6"];
	var domElements = (function() {
		return {
			ARRAY: document.getElementsByClassName("array")[0],
			SIZE_INPUT: document.getElementById("changeSize"),
			GENERATE_NEW: document.getElementById("generateNew"),
			SORT: document.getElementById("sort"),
			arrayElement: function(i) {
				return document.getElementById("arrayElement" + i);
			},
			CONTAINER: document.getElementsByClassName("container")[0],
			SIDEBAR: document.getElementById("sidebar"),
			ALGO_SELECTOR: function(i) {
				return document.getElementById("algo" + i);
			},
			ALGOS: function() {
				var c = this.SIDEBAR.children;
				var res = [];
				for (var i = 0 ; i < c.length ; i++) {
					if (c[i].id.indexOf("algo") >= 0) {
						res.push(c[i]);
					}
				}
				return res;
			},
			REVERSE: document.getElementById("reverse"),
			SHUFFLE: document.getElementById("shuffle")
		}
	})();
	function getConstant() {
		return Math.floor(TOTAL_HEIGHT / MAX_ITEM);
	}
	function getColor(item, color) {
		if (color) {
			return color;
		}
		if (item.final) {
			return DEFAULT_ITEM_COLOR;
		}
		return DEFAULT_ITEM_COLOR1;
	}
	function reset(items) {
		var innerHTML = '';
		var SIZE = items.length;
		var itemWidth = Math.floor((TOTAL_WIDTH * 2) / (3 * SIZE)), leftMargin = Math.ceil(TOTAL_WIDTH / (3 * SIZE));
		var c = getConstant();
		for (var i = 0 ; i < SIZE ; i++) {
			innerHTML += '<div class="arrayElement" id="arrayElement' + (i + 1) + '" style="width: ' + itemWidth + 'px;margin-left: ' + leftMargin + 'px;height: ' + (items[i].val * c) + 'px; background: ' + getColor(items[i]) + ';"></div>';
		}
		domElements.ARRAY.innerHTML = innerHTML;
	}
	function update(i, item) {
		var c = getConstant();
		domElements.arrayElement(i + 1).style.height = c * item.val;
		if (item.final) {
			setItemColor(i, item);
		}
	}
	function setItemColor(i, item, color) {
		try {
			color = getColor(item, color);
			domElements.arrayElement(i + 1).style.background = color;	
		} catch (err) {
			console.warning("Index out of bound");
		}
	}
	function changeAlgo(prevId, newId) {
		domElements.ALGO_SELECTOR(prevId).classList.remove("active");
		domElements.ALGO_SELECTOR(newId).classList.add("active");
	}
	function init(MAX_ITM, MIN_SIZE, MAX_SIZE, algos, selectedAlgo) {
		MAX_ITEM = MAX_ITM;
		var el = domElements.SIZE_INPUT;
		el.setAttribute("min", MIN_SIZE.toString());
		el.setAttribute("max", MAX_SIZE.toString());
		el.value = ((MIN_SIZE + MAX_SIZE) / 2);
		for (var id in algos) {
			if (algos.hasOwnProperty(id)) {
				var node = document.createElement("DIV");
				node.classList.add("sidebar-item");
				node.classList.add("algo");
				node.setAttribute("id", "algo" + id);
				node.innerText = algos[id].label;
				if (selectedAlgo == +id) {
					node.classList.add("active");
				}
				domElements.SIDEBAR.appendChild(node);
			}
		}
	}
	function justSorted() {
		return new Promise(function(resolve, reject) {
			var element = domElements.ARRAY;
			element.classList.add("just-sorted");
			setTimeout(function() {
				element.classList.remove("just-sorted");
				resolve();
			}, 600);
		});
	}
	function disable() {
		domElements.SIZE_INPUT.disabled = true;
		domElements.CONTAINER.classList.add("disabled");
	}
	function enable() {
		domElements.SIZE_INPUT.disabled = false;
		domElements.CONTAINER.classList.remove("disabled");
	}
	return {
		domElements: domElements,
		reset: reset,
		init: init,
		update: update,
		setItemColor: setItemColor,
		justSorted: justSorted,
		COLORS: COLORS,
		disable: disable,
		enable: enable,
		changeAlgo: changeAlgo
	};
})();