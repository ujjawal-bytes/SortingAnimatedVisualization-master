var BubbleSort = (function() {
	async function sort(items, swap, Counter) {
		if (items.length <= 1) {
			return Promise.resolve(1);
		}
		var flag = true, size = items.length;
		while (flag) {
			flag = false;
			var i = new Counter(0), j = new Counter(1);
			while (i.get() < (size - 1)) {
				if (items[i.get()].val > items[j.get()].val) {
					await swap(i.get(), j.get());
					flag = true;
				}
				await i.set(i.get() + 1);
				await j.set(j.get() + 1);
			}
			size--;
			items[i.get()].final = true;
			await i.destroy();
			await j.destroy();
		}
		for (var idx = 0 ; !items[idx].final && idx < items.length ; idx++) {
			items[idx].final = true;
			await swap(idx, idx);
		}
		return Promise.resolve(1);
	}
	return {
		sort: sort
	}
})();