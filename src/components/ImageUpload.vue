<script setup lang="ts" generic="T">
	import { ref } from "vue";
	import Uploader from "vue-media-upload";
	interface WithName {
		name: string;
		[key: string]: any;
	}
	const props = withDefaults(
		defineProps<{
			modelValue?: string[];
			max?: number;
		}>(),
		{
			modelValue: () => [],
			max: 6,
		}
	);
	const emit = defineEmits(["update:modelValue"]);
	const convertStringToMedia = (strList: string[]): WithName[] => {
		return strList.map((string) => {
			return { name: string };
		});
	};
	const convertMediaToString = (media: WithName[]) => {
		return media.map((x) => x.name);
	};
	// eslint-disable-next-line vue/no-setup-props-destructure
	const media = ref(convertStringToMedia(props.modelValue));
	const uploadUrl = ref(`${import.meta.env.VITE_BACKEND_URL}/uploadimage`);
	const onChanged = (files: any[]) => {
		emit("update:modelValue", convertMediaToString(files));
	};
</script>
<template>
    <Uploader :server="uploadUrl" @change="onChanged" :media="media" :max="max"></Uploader>
</template>