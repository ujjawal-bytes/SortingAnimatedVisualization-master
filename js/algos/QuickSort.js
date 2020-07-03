var QuickSort = (function() {
	async function sortHelper(items, start, end, swap, Counter) {
		if (start >= end) {
			if (start == end) {
				items[start].final = true;
				await swap(start, start);
			}
			return Promise.resolve(1);
		}
		var i = new Counter(start), lt = new Counter(start), gt = new Counter(end);
		while (i.get() <= gt.get()) {
			if (items[i.get()].val < items[lt.get()].val) {
				await swap(i.get(), lt.get());
				await i.set(i.get() + 1);
				await lt.set(lt.get() + 1);
			} else if (items[i.get()].val > items[lt.get()].val) {
				await swap(i.get(), gt.get());
				await gt.set(gt.get() - 1);
			} else await i.set(i.get() + 1);
		}
		for (var idx = lt.get() ; idx <= gt.get() ; idx++) {
			items[idx].final = true;
			await swap(idx, idx);
		}
		i.destroy();
		lt.destroy();
		gt.destroy();
		await sortHelper(items, start, lt.get() - 1, swap, Counter);
		await sortHelper(items, gt.get() + 1, end, swap, Counter);
		return Promise.resolve(1);
	}
	async function sort(items, swap, Counter) {
		await sortHelper(items, 0, items.length - 1, swap, Counter);
		return Promise.resolve(1);
	}
	return {
		sort: sort
	}
})();