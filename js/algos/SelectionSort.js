var SelectionSort = (function() {
	async function sort(items, swap, Counter) {
		var i = new Counter(0), size = items.length;
		while (i.get() < (size - 1)) {
			var j = new Counter(i.get() + 1);
			var minIdx = new Counter(i.get());
			while (j.get() < size) {
				if (items[minIdx.get()].val > items[j.get()].val) {
					await minIdx.set(j.get());
				}
				await j.set(j.get() + 1);
			}
			await swap(i.get(), minIdx.get());
			items[i.get()].final = true;
			await swap(i.get(), i.get());
			await i.set(i.get() + 1);
			await minIdx.destroy();
			await j.destroy();
		}
		items[i.get()].final = true;
		await swap(i.get(), i.get());
		await i.destroy();
		return Promise.resolve(1);
	}
	return {
		sort: sort
	}
})();