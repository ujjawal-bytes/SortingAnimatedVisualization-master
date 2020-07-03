var HeapSort = (function() {
	async function sink(items, i, swap, size, Counter) {
		if (i >= (size - 1) || i < 0) {
			return Promise.resolve(1);;
		}
		var p = new Counter(i);
		var c1 = new Counter(2 * i + 1), c2 = new Counter(2 * i + 2);
		if (c2.get() < size) {
			if (items[c1.get()].val > items[i].val && items[c1.get()].val >= items[c2.get()].val) {
				await swap(i, c1.get());
				await p.destroy();
				await c1.destroy();
				await c2.destroy();
				await sink(items, c1.get(), swap, size, Counter);
			} else if (items[c2.get()].val > items[i].val && items[c2.get()].val > items[c1.get()].val) {
				await swap(i, c2.get());
				await p.destroy();
				await c1.destroy();
				await c2.destroy();
				await sink(items, c2.get(), swap, size, Counter);
			}
		} else if (c1.get() < size) {
			if (items[c1.get()].val > items[i].val) {
				await swap(i, c1.get());
				await p.destroy();
				await c1.destroy();
				await c2.destroy();
				await sink(items, c1.get(), swap, size, Counter);
			}
		}
		await p.destroy();
		await c1.destroy();
		await c2.destroy();
		return Promise.resolve(1);
	}
	async function sort(items, swap, Counter) {
		var mid = Math.floor(items.length / 2);
		var size = items.length;
		for (var i = mid - 1 ; i >= 0 ; i--) {
			await sink(items, i, swap, size, Counter);
		}
		while (size > 1) {
			items[0].final = true;
			await swap(0, size - 1);
			size--;
			await sink(items, 0, swap, size, Counter);
		}
		items[0].final = true;
		await swap(0, 0);
		return Promise.resolve(1);
	}
	return {
		sort: sort
	}
})();