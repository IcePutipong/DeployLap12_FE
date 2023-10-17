<script setup lang="ts">
    import { useRouter } from 'vue-router';
    const router = useRouter()
</script>

<template>
    <div class="network-error ">
        <h1>Uh-oh!</h1>
        <h3>
            It look like you're experiencing some network issue, pls take reath and 
            <a href="#" @click="router.go(-1)">click here</a>
            to try agian.
        </h3>
        <p>Sorry, we can't get the data from the server.</p>
        <p>Pls try again later.</p>

    </div>
</template>