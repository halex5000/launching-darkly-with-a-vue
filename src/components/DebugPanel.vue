<script setup>
    import { useLDClient } from 'launchdarkly-vue-client-sdk'

    const client = useLDClient();
</script>


<template>
    <header>debug panel</header>
    <table>
        <th colspan="3">debugging info</th>
        <tr>
            <td>
                current user
            </td>
            <td>
                {{client.getUser()}}
            </td>
        </tr>
    </table>

</template>