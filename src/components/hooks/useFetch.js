import useSWR from 'swr';

export default (...args) =>
  useSWR(...args, () =>
    fetch(...args, {
      headers: {
        Authorization: 'Bearer lw62zc0scyk8l72fduljiep8d49i84',
        'Client-ID': 'r42fa7qsnqhqmlwdpel6po1mb5h51j',
      },
    }).then(res => res.json()),
  );
