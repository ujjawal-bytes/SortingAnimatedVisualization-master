var MergeSort = (function() {
	async function sortHelper(items, aux, start, end, swap, Counter, flag) {
		if (start >= end) {
			return Promise.resolve(1);;
		}
		var mid = Math.floor((start + end) / 2);
		await sortHelper(items, aux, start, mid, swap, Counter, false);
		await sortHelper(items, aux, mid + 1, end, swap, Counter, false);
		for (var i = start ; i <= end ; i++) {
			aux[i] = {
				val: items[i].val,
				final: items[i].final
			};
		}



		var i = new Counter(start), j = new Counter(mid + 1), k = new Counter(start);
		while (i.get() <= mid && j.get() <= end) {
			if (aux[i.get()].val < aux[j.get()].val) {
				items[k.get()] = aux[i.get()];
				if (flag) {
					items[k.get()].final = true;
				}
				await swap(k.get(), k.get());
				await i.set(i.get() + 1);
			} else {
				items[k.get()] = aux[j.get()];
				if (flag) {
					items[k.get()].final = true;
				}
				await swap(k.get(), k.get());
				await j.set(j.get() + 1);
			}
			await k.set(k.get() + 1);
		}
		while (i.get() <= mid) {
			items[k.get()] = aux[i.get()];
			if (flag) {
				items[k.get()].final = true;
			}
			await swap(k.get(), k.get());
			await i.set(i.get() + 1);
			await k.set(k.get() + 1);
		}
		while (j.get() <= end) {
			items[k.get()] = aux[j.get()];
			if (flag) {
				items[k.get()].final = true;
			}
			await swap(k.get(), k.get());
			await j.set(j.get() + 1);
			await k.set(k.get() + 1);
		}
		await i.destroy();
		await j.destroy();
		await k.destroy();
		return Promise.resolve(1);
	}
	async function sort(items, swap, Counter) {
		var aux = [];
		for (var i = 0 ; i < items.length ; i++) {
			aux[i] = items[i];
		}
		await sortHelper(items, aux, 0, items.length - 1, swap, Counter, true);
		return Promise.resolve(1);
	}
	return {
		sort: sort
	}
})();