<template>
	<div class="flex flex-row justify-between items-center gap-4">
		<label v-if="label">{{ label }}</label>
		<select
			class="border border-black border-opacity-25 rounded-md px-2 py-1"
			:value="modelValue"
			v-bind="{
                ...$attrs,
                onChange: ($event) => {
                    $emit('update:modelValue', ($event.target as HTMLSelectElement)?.value);
                },
            }">
			<option
				v-for="option in options"
				:value="valueExtractor(option)"
				:key="keyExtractor(option)"
				:selected="valueExtractor(option) === modelValue">
				{{ textExtractor(option) }}
			</option>
		</select>
	</div>
</template>

<script setup lang="ts" generic="T">
	defineProps<{
		label: string;
		modelValue: T[keyof T];
		options: T[];
		keyExtractor: (x: T) => string | number | symbol | undefined;
		valueExtractor: (x: T) => T[keyof T];
		textExtractor: (x: T) => T[keyof T];
	}>();
</script>