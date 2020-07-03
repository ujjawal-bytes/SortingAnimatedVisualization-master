var modelController = (function(QuickSort, MergeSort, HeapSort, BubbleSort, SelectionSort) {
	var items;
	var MIN_ITEM = 1, MAX_ITEM = 200;
	var algos = {
		1: {
			label: "Quick Sort",
			id: 1,
			fn: QuickSort.sort
		},
		2: {
			label: "Merge Sort",
			id: 2,
			fn: MergeSort.sort
		},
		3: {
			label: "Heap Sort",
			id: 3,
			fn: HeapSort.sort
		},
		4: {
			label: "Bubble Sort",
			id: 4,
			fn: BubbleSort.sort
		},
		5: {
			label: "Selection Sort",
			id: 5,
			fn: SelectionSort.sort
		}
	}
	function reset(size) {
		items = [];
		while (size--) {
			var curr = Math.max(Math.floor(Math.random() * MAX_ITEM) + 1, MIN_ITEM);
			items.push({
				val: curr,
				final: false
			});
		}
	}
	function resetItems() {
		for (var i = 0 ; i < items.length ; i++) {
			items[i].final = false;
		}
	}
	function swap(i, j) {
		var t = items[i];
		items[i] = items[j];
		items[j] = t;
	}
	function getItems() {
		return items;
	}
	function getItem(i) {
		if (i < items.length && i >= 0) {
			return items[i];	
		}
		return null;
	}
	async function sort(selectedAlgo, swap, Counter, jusSorted) {
		if (!algos.hasOwnProperty(selectedAlgo)) {
			return;
		}
		await algos[selectedAlgo].fn(items, swap, Counter, jusSorted);
	}
	function reverse() {
		var l = 0, r = items.length - 1;
		while (l < r) {
			swap(l, r);
			l++;
			r--;
		}
	}
	function shuffle() {
		for (var i = 1 ; i < items.length ; i++) {
			var r = Math.floor(Math.random() * (i + 1));
			swap(i, r);
		}
	}
	return {
		reset: reset,
		getItems: getItems,
		getItem: getItem,
		swap: swap,
		MIN_ITEM: MIN_ITEM,
		MAX_ITEM: MAX_ITEM,
		sort: sort,
		resetItems: resetItems,
		algos: algos,
		reverse: reverse,
		shuffle: shuffle
	};
})(QuickSort, MergeSort, HeapSort, BubbleSort, SelectionSort);