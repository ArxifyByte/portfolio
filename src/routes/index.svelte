<script context="module" lang="ts">
	export const prerender = true;
</script>

<script lang="ts">
	import { DateTime } from 'luxon';
	// Components
	import ProjectItem from '$lib/components/ProjectItem.svelte';
	// @ts-ignore
	import { Confetti } from "svelte-confetti";
	import { getAppleMusicData, getCodeData, getOtherActivities } from '$lib/rpcUtils';
	// Lanyard stuff
	import { onMount } from 'svelte';
	import type { useLanyard } from 'svelte-lanyard';

	const timeZone = 'America/Los_Angeles';
	const isTimeZoneSame = Intl.DateTimeFormat().resolvedOptions().timeZone === timeZone;
	let timeZoneToggle = false;

	$: timeFormatter = new Intl.DateTimeFormat('en-US', {
		hour: 'numeric',
		minute: 'numeric',
		second: 'numeric',
		timeZone: timeZoneToggle ? timeZone : undefined
	});
	$: dateFormatter = new Intl.DateTimeFormat('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
		timeZoneName: 'short',
		timeZone: timeZoneToggle ? timeZone : undefined
	});

	let now = new Date();
	setInterval(() => {
		now = new Date();
	}, 1000);
	
	$: date = dateFormatter.format(now);
	$: time = timeFormatter.format(now);

	let data: ReturnType<typeof useLanyard>;
	onMount(async () => {
		const { useLanyard } = await import('svelte-lanyard');
		data = useLanyard('619284841187246090');
	});
	$: codeData = getCodeData($data);
	$: appleMusicData = getAppleMusicData($data);
	$: otherActivities = getOtherActivities($data);
</script>

<svelte:head>
	<title>polar</title>
	<meta name="og:title" content="polar.blue" />
	<meta name="description" content="software engineer & community manager" />
	<meta name="og:description" content="software engineer & community manager" />
	<meta name="theme-color" media="(prefers-color-scheme: light)" content="#f9f0f5" />
	<meta name="theme-color" media="(prefers-color-scheme: dark)" content="#1C2433" />
</svelte:head>

<section
	class="p-8 sm:p-12 lg:p-24 lg:py-16 font-jetbrains z-10 flex flex-col sm:flex-row gap-y-10 justify-between"
>
	<div class="flex flex-col gap-7">
		<div class="min-h-[3em] lg:min-h-0">
			<h1 class="text-arc-700 dark:text-arc-300">
				<span class="dark:text-arc-blue">arxify, student & self-taught developer</span>
			</h1>
		</div>
		<div>
			<h1 class="text-arc-900 dark:text-arc-100 font-extrabold">projects</h1>
			<ul class="list-disc list-inside text-arc-700 dark:text-arc-blue">
				<ProjectItem
					href="https://twitter.com/h7ddensociety"
					name="hidden society"
					description="independent record label"
				/>
				<ProjectItem
					href="https://github.com/darkside-development"
					name="darkside development"
					description="open source development team"
				/>
				<ProjectItem
					href="https://dsc.gg/amane"
					name="amane"
					description="a powerful multipurpose discord bot"
				/>
			</ul>
		</div>
		<div>
			<h1 class="text-arc-900 dark:text-arc-100 font-extrabold">old</h1>
			<ul class="list-disc list-inside text-arc-700 dark:text-arc-blue">
			<ProjectItem
					href="https://arxify.vercel.app/archive/old"
					name="website"
					description="outdated website with my social links"
				/>
			</ul>
		</div>
		<div>
			<h1 class="text-arc-900 dark:text-arc-100 font-extrabold">links</h1>
			<ul class="list-disc list-inside text-arc-700 dark:text-arc-blue">
				<ProjectItem href="https://github.com/arxifybyte" name="github" />
				<ProjectItem href="https://discord.gg/users/975954277791047752" name="discord" />
				<ProjectItem href="https://twitter.com/devarxify" name="twitter" />
				<ProjectItem href="mailto:creators@cyberdude.com" name="email" />
<!-- 				<ProjectItem href="/resume.pdf" name="resume" /> -->
			</ul>
		</div>
	</div>
	<div
		class="text-arc-900 dark:text-arc-300 flex flex-col items-start sm:items-end gap-3 sm:gap-7 sm:text-right"
	>
		{#if !isTimeZoneSame}
			<div
				class="flex flex-col items-start sm:items-end hover:underline cursor-pointer"
				on:click={() => (timeZoneToggle = !timeZoneToggle)}
			>
				<span>{date}</span>
				<span>{time}</span>
			</div>
		{:else}
			<div class="flex flex-col items-start sm:items-end">
				<span>{date}</span>
				<span>{time}</span>
			</div>
		{/if}
		{#if appleMusicData}
		<div class="flex flex-col items-start sm:items-end">
			<span class="text-arc-700 dark:text-arc-400">listening to <span class="text-arc-900 dark:text-arc-100 font-extrabold">{appleMusicData.song_name?.toLocaleLowerCase()}</span> on apple music</span>	
			<span class="text-arc-700 dark:text-arc-400">by <span class="text-arc-900 dark:text-arc-100 font-extrabold">{appleMusicData.artist?.toLocaleLowerCase()}</span></span>
			<span class="text-arc-700 dark:text-arc-400">on <span class="text-arc-900 dark:text-arc-100 font-extrabold">{appleMusicData.album_name?.toLocaleLowerCase()}</span></span>
		</div>
		{/if}
		{#if $data?.spotify}
			<div class="flex flex-col items-start sm:items-end">
				<span class="text-arc-700 dark:text-arc-400">listening to <a href={`https://open.spotify.com/track/${$data.spotify.track_id}`}><span class="text-arc-900 dark:text-arc-100 font-extrabold underline">{$data.spotify?.song.toLocaleLowerCase()}</span></a> on spotify</span>	
				<span class="text-arc-700 dark:text-arc-400">by <span class="text-arc-900 dark:text-arc-100 font-extrabold">{$data.spotify?.artist.toLocaleLowerCase()}</span></span>
				<span class="text-arc-700 dark:text-arc-400">on <span class="text-arc-900 dark:text-arc-100 font-extrabold">{$data.spotify?.album.toLocaleLowerCase()}</span></span>
			</div>
		{/if}
		{#if codeData?.idling}
			<div class="flex flex-col items-start sm:items-end">
				<span class="text-arc-900 dark:text-arc-100 font-extrabold">vsc</span>
				<span class="text-arc-700 dark:text-arc-400">currently idling</span>
			</div>
		{/if}
		{#if codeData && !codeData.idling}
			<div class="flex flex-col items-start sm:items-end">
				<span class="text-arc-900 dark:text-arc-100 font-extrabold">vsc</span>
				<span class="text-arc-800 dark:text-arc-300"
					>working on <span class="text-arc-700 dark:text-arc-100 font-extrabold">{codeData.folder?.toLocaleLowerCase()}</span></span
				>
				{#if codeData.editing} 
					<span class="text-arc-700 dark:text-arc-400"
						>currently 
						<span class="text-arc-700 dark:text-arc-100 font-extrabold">{codeData.editing?.toLocaleLowerCase()}</span>
					</span>
				{/if}
			</div>
		{/if}
		{#if otherActivities}
			{#each otherActivities as activity}
				<div class="flex flex-col items-start sm:items-end">
					<span class="text-arc-700 dark:text-arc-400"
						>playing <span class="text-arc-700 dark:text-arc-200">{activity.name.toLocaleLowerCase()}</span>
						{#if activity.start}
							for {DateTime.fromJSDate(activity.start)
								.toRelative({
									base: DateTime.fromJSDate(now)
								})
								?.replace(' ago', '')}
						{/if}
					</span>
				</div>
			{/each}
		{/if}
	</div>
</section>
