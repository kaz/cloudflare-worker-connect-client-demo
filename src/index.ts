import { ElizaService } from '@buf/connectrpc_eliza.bufbuild_es/connectrpc/eliza/v1/eliza_pb';
import { createClient } from '@connectrpc/connect';
import { createConnectTransport } from '@connectrpc/connect-web';

const client = createClient(
	ElizaService,
	createConnectTransport({
		baseUrl: 'https://demo.connectrpc.com',
		fetch: (input, init) => {
			// workaround: avoid error
			delete (init as any)?.mode;
			delete (init as any)?.credentials;
			delete init?.redirect;

			return fetch(input, init);
		},
	})
);

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const resp = await client.say({ sentence: 'I feel happy.' });
		return new Response(resp.sentence);
	},
} satisfies ExportedHandler<Env>;
