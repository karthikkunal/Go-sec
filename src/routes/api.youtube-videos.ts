import { createFileRoute } from '@tanstack/react-router'

const FALLBACK_VIDEOS: Record<string, Array<{ id: string; title: string; channel: string; thumbnail: string }>> = {
  '1': [
    { id: 'hXSFdwIOfnE', title: 'Cybersecurity for Beginners – Full Course', channel: 'freeCodeCamp.org', thumbnail: 'https://img.youtube.com/vi/hXSFdwIOfnE/mqdefault.jpg' },
    { id: 'U_P23SqJaDc', title: 'Linux for Beginners – Full Course', channel: 'freeCodeCamp.org', thumbnail: 'https://img.youtube.com/vi/U_P23SqJaDc/mqdefault.jpg' },
    { id: 'qiQR5rTSshw', title: 'Computer Networking Full Course', channel: 'freeCodeCamp.org', thumbnail: 'https://img.youtube.com/vi/qiQR5rTSshw/mqdefault.jpg' },
    { id: 'X2mS5V3K6ro', title: 'Python for Beginners – Full Course', channel: 'Programming with Mosh', thumbnail: 'https://img.youtube.com/vi/X2mS5V3K6ro/mqdefault.jpg' },
  ],
  '2': [
    { id: 'SiyW-DQk2po', title: 'CompTIA Security+ Full Course', channel: 'Professor Messer', thumbnail: 'https://img.youtube.com/vi/SiyW-DQk2po/mqdefault.jpg' },
    { id: 'PlhOnyeOpXE', title: 'Wireshark Tutorial for Beginners', channel: 'David Bombal', thumbnail: 'https://img.youtube.com/vi/PlhOnyeOpXE/mqdefault.jpg' },
    { id: '7B1gjPGX0f8', title: 'Active Directory Tutorial for Beginners', channel: 'Techguru', thumbnail: 'https://img.youtube.com/vi/7B1gjPGX0f8/mqdefault.jpg' },
    { id: 'GqmQg-cszw4', title: 'MITRE ATT&CK Framework Explained', channel: 'John Hammond', thumbnail: 'https://img.youtube.com/vi/GqmQg-cszw4/mqdefault.jpg' },
  ],
  '3': [
    { id: 'fNzpcB7ODxQ', title: 'Ethical Hacking Full Course', channel: 'freeCodeCamp.org', thumbnail: 'https://img.youtube.com/vi/fNzpcB7ODxQ/mqdefault.jpg' },
    { id: 'WnN6dbos5u8', title: 'OWASP Top 10 Explained', channel: 'Computerphile', thumbnail: 'https://img.youtube.com/vi/WnN6dbos5u8/mqdefault.jpg' },
    { id: 'Tutq9KeHVqw', title: 'Metasploit Tutorial for Beginners', channel: 'HackerSploit', thumbnail: 'https://img.youtube.com/vi/Tutq9KeHVqw/mqdefault.jpg' },
    { id: 'R-IKAqmqPcA', title: 'Privilege Escalation Techniques', channel: 'TCM Security', thumbnail: 'https://img.youtube.com/vi/R-IKAqmqPcA/mqdefault.jpg' },
  ],
  '4': [
    { id: 'a9_Pp9Bj0Zo', title: 'SOC Analyst Career Guide', channel: 'Gerald Auger', thumbnail: 'https://img.youtube.com/vi/a9_Pp9Bj0Zo/mqdefault.jpg' },
    { id: 'TG-gAo80nEM', title: 'Splunk Tutorial for Beginners', channel: 'Intellipaat', thumbnail: 'https://img.youtube.com/vi/TG-gAo80nEM/mqdefault.jpg' },
    { id: 'PAScHL-dS4o', title: 'Incident Response Process Explained', channel: 'CISA', thumbnail: 'https://img.youtube.com/vi/PAScHL-dS4o/mqdefault.jpg' },
    { id: 'sPG-zFoVGpI', title: 'Malware Analysis Tutorial', channel: 'HuskyHacks', thumbnail: 'https://img.youtube.com/vi/sPG-zFoVGpI/mqdefault.jpg' },
  ],
  '5': [
    { id: 'gPabfBqnS_g', title: 'Reverse Engineering for Beginners', channel: 'LiveOverflow', thumbnail: 'https://img.youtube.com/vi/gPabfBqnS_g/mqdefault.jpg' },
    { id: '0uejy-TEmoY', title: 'Mobile App Pentesting Introduction', channel: 'HackerSploit', thumbnail: 'https://img.youtube.com/vi/0uejy-TEmoY/mqdefault.jpg' },
    { id: 'cSGBBMBxlcU', title: 'IoT Security Fundamentals', channel: 'Security Weekly', thumbnail: 'https://img.youtube.com/vi/cSGBBMBxlcU/mqdefault.jpg' },
    { id: 'anh3l-lJ1WA', title: 'AI Security & LLM Attacks', channel: 'Computerphile', thumbnail: 'https://img.youtube.com/vi/anh3l-lJ1WA/mqdefault.jpg' },
  ],
  '6': [
    { id: 'Bkfbsd-kFJ4', title: 'OSCP Preparation Guide 2024', channel: 'TCM Security', thumbnail: 'https://img.youtube.com/vi/Bkfbsd-kFJ4/mqdefault.jpg' },
    { id: 'SiyW-DQk2po', title: 'CompTIA Security+ Study Guide', channel: 'Professor Messer', thumbnail: 'https://img.youtube.com/vi/SiyW-DQk2po/mqdefault.jpg' },
    { id: 'sVIB_hgaDf8', title: 'CEH vs OSCP – Which Cert First?', channel: 'Gerald Auger', thumbnail: 'https://img.youtube.com/vi/sVIB_hgaDf8/mqdefault.jpg' },
    { id: 'dXFHf6g7kpI', title: 'CISSP Study Guide Overview', channel: 'IT & Cybersecurity Academy', thumbnail: 'https://img.youtube.com/vi/dXFHf6g7kpI/mqdefault.jpg' },
  ],
  '7': [
    { id: 'Hg9byzXmD4c', title: 'Cybersecurity Career Paths – Full Guide', channel: 'Gerald Auger', thumbnail: 'https://img.youtube.com/vi/Hg9byzXmD4c/mqdefault.jpg' },
    { id: 'jRnk6cCLmYg', title: 'Red Team vs Blue Team Explained', channel: 'NetworkChuck', thumbnail: 'https://img.youtube.com/vi/jRnk6cCLmYg/mqdefault.jpg' },
    { id: 'RcRNQYjW5oc', title: 'Bug Bounty Hunting for Beginners', channel: 'NahamSec', thumbnail: 'https://img.youtube.com/vi/RcRNQYjW5oc/mqdefault.jpg' },
    { id: 'SsXkMDEdH40', title: 'GRC – Governance Risk & Compliance Career', channel: 'Cybrary', thumbnail: 'https://img.youtube.com/vi/SsXkMDEdH40/mqdefault.jpg' },
  ],
}

const PHASE_QUERIES: Record<string, string> = {
  '1': 'cybersecurity foundations beginners linux networking python',
  '2': 'CompTIA Security+ core network security skills tutorial',
  '3': 'ethical hacking penetration testing OWASP offensive security',
  '4': 'SOC analyst blue team incident response SIEM Splunk',
  '5': 'advanced cybersecurity reverse engineering mobile IoT security',
  '6': 'cybersecurity certifications OSCP CISSP guide',
  '7': 'cybersecurity career paths red blue team bug bounty',
}

export const Route = createFileRoute('/api/youtube-videos')({
  server: {
    handlers: {
      GET: async ({ request }) => {
        const url = new URL(request.url)
        const phase = url.searchParams.get('phase') ?? '1'
        const apiKey = process.env.YOUTUBE_API_KEY

        if (apiKey) {
          const query = encodeURIComponent(PHASE_QUERIES[phase] ?? PHASE_QUERIES['1'])
          const ytUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${query}&type=video&maxResults=4&key=${apiKey}`
          try {
            const res = await fetch(ytUrl)
            if (res.ok) {
              const data = await res.json() as {
                items: Array<{
                  id: { videoId: string }
                  snippet: { title: string; channelTitle: string; thumbnails: { medium: { url: string } } }
                }>
              }
              const videos = data.items.map((item) => ({
                id: item.id.videoId,
                title: item.snippet.title,
                channel: item.snippet.channelTitle,
                thumbnail: item.snippet.thumbnails.medium.url,
              }))
              return Response.json({ videos, source: 'youtube' })
            }
          } catch {
            // fall through to fallback
          }
        }

        const videos = FALLBACK_VIDEOS[phase] ?? FALLBACK_VIDEOS['1']
        return Response.json({ videos, source: 'curated' })
      },
    },
  },
})
