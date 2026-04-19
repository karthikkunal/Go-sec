import { createFileRoute } from '@tanstack/react-router'
import { useState, useCallback } from 'react'

export const Route = createFileRoute('/')({
  component: CyberSecurityRoadmap,
})

interface Video {
  id: string
  title: string
  channel: string
  thumbnail: string
}

interface YoutubeModalProps {
  phase: string
  topic: string
  color: string
  onClose: () => void
}

function YoutubeModal({ phase, topic, color, onClose }: YoutubeModalProps) {
  const [videos, setVideos] = useState<Video[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loaded, setLoaded] = useState(false)

  const fetchVideos = useCallback(async () => {
    if (loaded) return
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`/api/youtube-videos?phase=${phase}`)
      if (!res.ok) throw new Error('Failed to fetch')
      const data = await res.json() as { videos: Video[] }
      setVideos(data.videos)
      setLoaded(true)
    } catch {
      setError('Could not load videos. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [phase, loaded])

  useState(() => { fetchVideos() })

  return (
    <div
      style={{
        position: 'fixed', inset: 0, zIndex: 1000,
        background: 'rgba(3,10,15,0.92)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        padding: '20px',
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: 'var(--surface)',
          border: `1px solid ${color}`,
          maxWidth: '860px', width: '100%',
          maxHeight: '85vh', overflow: 'auto',
          padding: '28px',
          position: 'relative',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
          <div>
            <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', color, letterSpacing: '4px', opacity: 0.7, marginBottom: '6px' }}>
              // PHASE {phase.padStart(2, '0')} RESOURCES //
            </div>
            <h2 style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '18px', color: 'var(--text-bright)', letterSpacing: '2px', textTransform: 'uppercase' }}>
              {topic} — Videos
            </h2>
          </div>
          <button
            onClick={onClose}
            style={{
              background: 'none', border: `1px solid ${color}`, color,
              fontFamily: "'Share Tech Mono', monospace", fontSize: '11px',
              padding: '6px 14px', cursor: 'pointer', letterSpacing: '2px',
              flexShrink: 0,
            }}
          >
            ✕ CLOSE
          </button>
        </div>

        {loading && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text)', fontFamily: "'Share Tech Mono', monospace", fontSize: '12px', letterSpacing: '3px' }}>
            LOADING VIDEOS...
          </div>
        )}

        {error && (
          <div style={{ textAlign: 'center', padding: '40px', color: 'var(--red)', fontFamily: "'Share Tech Mono', monospace", fontSize: '12px' }}>
            {error}
          </div>
        )}

        {videos && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '16px' }}>
            {videos.map((video) => (
              <a
                key={video.id}
                href={`https://www.youtube.com/watch?v=${video.id}`}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'block',
                  background: 'var(--bg)',
                  border: '1px solid var(--border)',
                  overflow: 'hidden',
                  textDecoration: 'none',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = color)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <div style={{ position: 'relative' }}>
                  <img
                    src={video.thumbnail}
                    alt={video.title}
                    style={{ width: '100%', aspectRatio: '16/9', objectFit: 'cover', display: 'block' }}
                  />
                  <div style={{
                    position: 'absolute', inset: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    background: 'rgba(0,0,0,0.3)',
                    opacity: 0,
                    transition: 'opacity 0.2s',
                  }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                  >
                    <div style={{
                      width: '56px', height: '56px', borderRadius: '50%',
                      background: 'rgba(255,0,0,0.9)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: '22px',
                    }}>▶</div>
                  </div>
                  <div style={{
                    position: 'absolute', bottom: '8px', right: '8px',
                    background: 'rgba(0,0,0,0.8)',
                    padding: '2px 6px',
                    fontFamily: "'Share Tech Mono', monospace",
                    fontSize: '10px', color: '#fff',
                    letterSpacing: '1px',
                  }}>YT</div>
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <div style={{
                    fontFamily: "'Rajdhani', sans-serif",
                    fontSize: '14px', fontWeight: 700,
                    color: 'var(--text-bright)', marginBottom: '4px',
                    lineHeight: 1.4,
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical' as const,
                    overflow: 'hidden',
                  }}>{video.title}</div>
                  <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '10px', color, opacity: 0.7, letterSpacing: '1px' }}>
                    {video.channel}
                  </div>
                </div>
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

interface PhaseProps {
  num: string
  title: string
  badge: string
  color: string
  children: React.ReactNode
  tip?: React.ReactNode
}

function Phase({ num, title, badge, color, children, tip }: PhaseProps) {
  const [showModal, setShowModal] = useState(false)

  return (
    <div style={{ marginBottom: '48px', animation: 'fadeUp 0.6s ease both' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '20px', color }}>
        <span style={{
          fontFamily: "'Orbitron', sans-serif", fontSize: '11px', fontWeight: 700,
          padding: '4px 10px', letterSpacing: '2px',
          border: '1px solid currentColor', whiteSpace: 'nowrap', opacity: 0.8,
        }}>PHASE {num}</span>
        <span style={{
          fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(13px, 2.5vw, 17px)',
          fontWeight: 700, letterSpacing: '2px', textTransform: 'uppercase',
        }}>{title}</span>
        <span style={{ flex: 1, height: '1px', opacity: 0.2, background: 'currentColor' }} />
        <span style={{
          fontFamily: "'Share Tech Mono', monospace", fontSize: '10px',
          padding: '3px 8px', border: '1px solid currentColor',
          letterSpacing: '1px', opacity: 0.6, whiteSpace: 'nowrap',
        }}>{badge}</span>
      </div>

      {children}

      {tip}

      <div style={{ marginTop: '20px', textAlign: 'center' }}>
        <button
          onClick={() => setShowModal(true)}
          style={{
            background: 'transparent',
            border: `1px solid ${color}`,
            color,
            fontFamily: "'Orbitron', sans-serif",
            fontSize: '11px',
            fontWeight: 700,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            padding: '10px 28px',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px',
            transition: 'background 0.2s, box-shadow 0.2s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = `${color}18`
            e.currentTarget.style.boxShadow = `0 0 20px ${color}30`
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'
            e.currentTarget.style.boxShadow = 'none'
          }}
        >
          <span style={{ fontSize: '16px' }}>▶</span>
          Watch YouTube Videos
        </button>
      </div>

      {showModal && (
        <YoutubeModal
          phase={num}
          topic={title}
          color={color}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  )
}

const cardStyle = (color: string): React.CSSProperties => ({
  background: 'var(--surface)',
  border: '1px solid var(--border)',
  padding: '18px',
  position: 'relative',
  overflow: 'hidden',
  transition: 'border-color 0.2s, transform 0.2s',
  cursor: 'default',
})

function Card({ icon, title, desc, tags, color, onHover }: {
  icon: string; title: string; desc: string; tags: string[]; color: string; onHover?: boolean
}) {
  return (
    <div
      style={cardStyle(color)}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = color
        e.currentTarget.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = 'var(--border)'
        e.currentTarget.style.transform = 'none'
      }}
    >
      <div style={{
        position: 'absolute', top: 0, left: 0, width: '3px', height: '100%',
        background: color,
      }} />
      <div style={{ fontSize: '22px', marginBottom: '10px' }}>{icon}</div>
      <div style={{
        fontFamily: "'Rajdhani', sans-serif", fontSize: '15px', fontWeight: 700,
        color: 'var(--text-bright)', letterSpacing: '1px', marginBottom: '8px', textTransform: 'uppercase',
      }}>{title}</div>
      <div style={{ fontSize: '13px', fontWeight: 300, lineHeight: 1.6, color: 'var(--text)' }}>{desc}</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '5px', marginTop: '10px' }}>
        {tags.map((tag) => (
          <span key={tag} style={{
            fontFamily: "'Share Tech Mono', monospace", fontSize: '9px',
            padding: '2px 7px', border: `1px solid ${color}`,
            letterSpacing: '1px', opacity: 0.55, color,
          }}>{tag}</span>
        ))}
      </div>
    </div>
  )
}

function CardsGrid({ children }: { children: React.ReactNode }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '14px' }}>
      {children}
    </div>
  )
}

function TipBox({ color, icon, children }: { color: string; icon: string; children: React.ReactNode }) {
  return (
    <div style={{
      border: `1px solid ${color}30`, padding: '16px 20px', marginTop: '14px',
      display: 'flex', gap: '14px', alignItems: 'flex-start',
    }}>
      <span style={{ fontSize: '20px', flexShrink: 0, marginTop: '2px' }}>{icon}</span>
      <span style={{ fontSize: '13px', fontWeight: 400, lineHeight: 1.7, color: 'var(--text)' }}>
        {children}
      </span>
    </div>
  )
}

function CyberSecurityRoadmap() {
  return (
    <div style={{ maxWidth: '1100px', margin: '0 auto', padding: '40px 20px 80px', position: 'relative', zIndex: 2 }}>
      <style>{`
        @keyframes fadeDown { from { opacity: 0; transform: translateY(-30px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes fadeUp { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
      `}</style>

      {/* Header */}
      <header style={{ textAlign: 'center', marginBottom: '60px', animation: 'fadeDown 0.8s ease both' }}>
        <div style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', color: 'var(--cyan)', letterSpacing: '6px', textTransform: 'uppercase', marginBottom: '12px', opacity: 0.7 }}>
          // complete learning path //
        </div>
        <h1 style={{
          fontFamily: "'Orbitron', sans-serif", fontSize: 'clamp(28px, 5vw, 52px)', fontWeight: 900,
          color: 'var(--text-bright)', textTransform: 'uppercase', letterSpacing: '4px',
          textShadow: '0 0 40px rgba(0,229,255,0.3)', lineHeight: 1.1,
        }}>
          Cyber<span style={{ color: 'var(--cyan)' }}>Security</span><br />Roadmap
        </h1>
        <p style={{ marginTop: '14px', fontSize: '16px', fontWeight: 300, color: 'var(--text)', letterSpacing: '2px' }}>
          From Zero to Security Professional
        </p>
        <div style={{ width: '200px', height: '1px', background: 'linear-gradient(90deg, transparent, var(--cyan), transparent)', margin: '20px auto 0' }} />
      </header>

      {/* Phase 1 */}
      <Phase num="01" title="Foundations" badge="3–6 MONTHS" color="var(--cyan)"
        tip={
          <TipBox color="var(--cyan)" icon="💡">
            <strong style={{ color: 'var(--text-bright)', fontWeight: 700 }}>Resources:</strong> TryHackMe Pre-Security path, CompTIA IT Fundamentals (ITF+), Professor Messer's free courses, Linux Journey (linuxjourney.com)
          </TipBox>
        }
      >
        <CardsGrid>
          <Card color="var(--cyan)" icon="🖥️" title="Operating Systems" desc="Master Linux (Kali, Ubuntu) and Windows internals. Learn file systems, permissions, processes, and CLI fluency." tags={['Linux', 'Windows', 'CLI']} />
          <Card color="var(--cyan)" icon="🌐" title="Networking Basics" desc="Understand TCP/IP, DNS, HTTP/S, OSI model, subnetting, routing, and common protocols." tags={['TCP/IP', 'DNS', 'OSI']} />
          <Card color="var(--cyan)" icon="💻" title="Programming & Scripting" desc="Learn Python for automation, Bash scripting, and basic understanding of C/C++ for exploit development later." tags={['Python', 'Bash', 'C/C++']} />
          <Card color="var(--cyan)" icon="🔐" title="Security Concepts" desc="CIA Triad, authentication vs authorization, cryptography basics, hashing, encryption, and PKI." tags={['CIA Triad', 'Crypto', 'PKI']} />
        </CardsGrid>
      </Phase>

      {/* Phase 2 */}
      <Phase num="02" title="Core Security Skills" badge="4–8 MONTHS" color="var(--green)"
        tip={
          <TipBox color="var(--green)" icon="🏆">
            <strong style={{ color: 'var(--text-bright)', fontWeight: 700 }}>Target Cert:</strong> CompTIA Security+ — the industry's most recognized entry-level security certification. Validates all Phase 2 knowledge.
          </TipBox>
        }
      >
        <CardsGrid>
          <Card color="var(--green)" icon="🛡️" title="Network Security" desc="Firewalls, IDS/IPS, VPNs, packet analysis with Wireshark, network hardening and segmentation." tags={['Wireshark', 'Firewall', 'IDS/IPS']} />
          <Card color="var(--green)" icon="🔍" title="Vulnerability Management" desc="Understand CVEs, CVSS scoring, vulnerability scanning with Nessus/OpenVAS, and patch management." tags={['Nessus', 'CVE', 'CVSS']} />
          <Card color="var(--green)" icon="🔑" title="Identity & Access Mgmt" desc="Active Directory, LDAP, SSO, MFA, OAuth2, privilege escalation concepts and Zero Trust principles." tags={['Active Directory', 'MFA', 'Zero Trust']} />
          <Card color="var(--green)" icon="📋" title="Security Frameworks" desc="NIST Cybersecurity Framework, ISO 27001, MITRE ATT&CK, CIS Controls — standards every pro must know." tags={['NIST', 'MITRE ATT&CK', 'ISO 27001']} />
        </CardsGrid>
      </Phase>

      {/* Phase 3 */}
      <Phase num="03" title="Offensive Security (Red Team)" badge="6–12 MONTHS" color="var(--orange)">
        <CardsGrid>
          <Card color="var(--orange)" icon="🎯" title="Ethical Hacking" desc="Penetration testing methodology, reconnaissance, scanning, exploitation, and post-exploitation phases." tags={['Metasploit', 'Nmap', 'Burp Suite']} />
          <Card color="var(--orange)" icon="🕸️" title="Web App Security" desc="OWASP Top 10, SQL injection, XSS, CSRF, SSRF, broken authentication, and API security testing." tags={['OWASP Top 10', 'SQLi', 'XSS']} />
          <Card color="var(--orange)" icon="⬆️" title="Privilege Escalation" desc="Linux and Windows privesc techniques, misconfiguration exploitation, kernel exploits, and lateral movement." tags={['LinPEAS', 'WinPEAS', 'GTFOBins']} />
          <Card color="var(--orange)" icon="📡" title="Network Pentesting" desc="WiFi attacks (WPA2 cracking), man-in-the-middle, ARP spoofing, VLAN hopping, and protocol attacks." tags={['Aircrack-ng', 'Responder', 'Bettercap']} />
          <Card color="var(--orange)" icon="🧠" title="Social Engineering" desc="Phishing campaigns, pretexting, vishing, and physical security assessments — human is the weakest link." tags={['Phishing', 'GoPhish', 'SET']} />
          <Card color="var(--orange)" icon="🚩" title="CTF & Practice Labs" desc="Capture The Flag competitions on HackTheBox, TryHackMe, PicoCTF to build real hands-on skills." tags={['HackTheBox', 'TryHackMe', 'VulnHub']} />
        </CardsGrid>
      </Phase>

      {/* Phase 4 */}
      <Phase num="04" title="Defensive Security (Blue Team)" badge="6–12 MONTHS" color="var(--purple)">
        <CardsGrid>
          <Card color="var(--purple)" icon="🔭" title="Security Monitoring (SOC)" desc="SIEM tools (Splunk, ELK, Microsoft Sentinel), log analysis, alert triage, and SOC analyst workflows." tags={['Splunk', 'ELK Stack', 'SIEM']} />
          <Card color="var(--purple)" icon="🚨" title="Incident Response" desc="IR lifecycle: preparation, detection, containment, eradication, recovery, and lessons learned (NIST SP 800-61)." tags={['IR Playbooks', 'Forensics', 'Containment']} />
          <Card color="var(--purple)" icon="🔬" title="Digital Forensics" desc="Disk and memory forensics, file carving, timeline analysis, chain of custody, and legal considerations." tags={['Autopsy', 'Volatility', 'FTK']} />
          <Card color="var(--purple)" icon="🦠" title="Malware Analysis" desc="Static and dynamic analysis of malware samples, reverse engineering basics, sandboxing, and IOC extraction." tags={['IDA Pro', 'Ghidra', 'Any.run']} />
          <Card color="var(--purple)" icon="🕵️" title="Threat Hunting" desc="Proactively search for threats using hypothesis-driven hunting, behavioral analytics, and threat intelligence." tags={['MITRE ATT&CK', 'Sigma', 'YARA']} />
          <Card color="var(--purple)" icon="☁️" title="Cloud Security" desc="AWS/Azure/GCP security, IAM policies, cloud-native security tools, misconfigurations, and shared responsibility." tags={['AWS Security', 'Azure AD', 'CloudTrail']} />
        </CardsGrid>
      </Phase>

      {/* Phase 5 */}
      <Phase num="05" title="Advanced Specializations" badge="ONGOING" color="var(--red)">
        <CardsGrid>
          <Card color="var(--red)" icon="⚙️" title="Reverse Engineering" desc="Assembly language, disassemblers, debuggers, binary exploitation, buffer overflows, and ROP chains." tags={['x86/x64 ASM', 'GDB', 'pwntools']} />
          <Card color="var(--red)" icon="📱" title="Mobile Security" desc="Android/iOS app pentesting, APK reverse engineering, SSL pinning bypass, and mobile threat modeling." tags={['MobSF', 'Frida', 'ADB']} />
          <Card color="var(--red)" icon="🔩" title="IoT / ICS Security" desc="Embedded systems, firmware analysis, SCADA/ICS protocols, hardware hacking, and OT security." tags={['JTAG', 'UART', 'Binwalk']} />
          <Card color="var(--red)" icon="🤖" title="AI / ML Security" desc="Adversarial ML, prompt injection, model inversion, data poisoning, and securing AI/LLM deployments." tags={['LLM Security', 'Adversarial ML']} />
        </CardsGrid>
      </Phase>

      {/* Phase 6: Certifications */}
      <Phase num="06" title="Certification Path" badge="STRUCTURED VALIDATION" color="var(--yellow)">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: '10px' }}>
          {[
            { level: 'ENTRY LEVEL', levelColor: 'var(--cyan)', name: 'CompTIA Security+', issuer: 'CompTIA — Broad foundation' },
            { level: 'ENTRY LEVEL', levelColor: 'var(--cyan)', name: 'eJPT', issuer: 'eLearnSecurity — First pentesting cert' },
            { level: 'INTERMEDIATE', levelColor: 'var(--green)', name: 'CEH', issuer: 'EC-Council — Ethical hacking' },
            { level: 'INTERMEDIATE', levelColor: 'var(--green)', name: 'CySA+', issuer: 'CompTIA — Blue team analyst' },
            { level: 'INTERMEDIATE', levelColor: 'var(--green)', name: 'PNPT', issuer: 'TCM Security — Practical pentesting' },
            { level: 'INTERMEDIATE', levelColor: 'var(--green)', name: 'AWS Security', issuer: 'Amazon — Cloud security specialty' },
            { level: 'ADVANCED', levelColor: 'var(--orange)', name: 'OSCP', issuer: 'OffSec — Gold standard pentesting' },
            { level: 'ADVANCED', levelColor: 'var(--orange)', name: 'GPEN / GWAPT', issuer: 'GIAC — Penetration testing' },
            { level: 'EXPERT', levelColor: 'var(--red)', name: 'CISM / CISSP', issuer: 'ISC2 / ISACA — Management & leadership' },
            { level: 'EXPERT', levelColor: 'var(--red)', name: 'OSED / OSWE', issuer: 'OffSec — Elite exploit dev' },
          ].map((cert) => (
            <div key={cert.name}
              style={{
                border: '1px solid var(--border)', padding: '12px 14px',
                display: 'flex', flexDirection: 'column', gap: '4px',
                transition: '0.2s', background: 'var(--surface)',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--cyan)')}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
            >
              <span style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '9px', letterSpacing: '2px', opacity: 0.5, textTransform: 'uppercase', color: cert.levelColor }}>
                {cert.level}
              </span>
              <span style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '12px', fontWeight: 700, color: 'var(--text-bright)', letterSpacing: '1px' }}>
                {cert.name}
              </span>
              <span style={{ fontSize: '11px', color: 'var(--text)', fontWeight: 300 }}>
                {cert.issuer}
              </span>
            </div>
          ))}
        </div>
      </Phase>

      {/* Phase 7: Career Paths */}
      <Phase num="07" title="Career Specializations" badge="CHOOSE YOUR PATH" color="var(--green)">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '14px' }}>
          {[
            { icon: '🔴', color: 'var(--red)', title: 'Red Team', desc: 'Offensive operator. Simulate nation-state attacks against mature organizations.' },
            { icon: '🔵', color: 'var(--cyan)', title: 'Blue Team / SOC', desc: 'Defend, detect, and respond. SOC Analyst → IR → Threat Hunter.' },
            { icon: '🟣', color: 'var(--purple)', title: 'Purple Team', desc: 'Bridge red and blue. Improve defenses by understanding attack techniques.' },
            { icon: '🟠', color: 'var(--orange)', title: 'Pentest / Bug Bounty', desc: 'Paid to hack. Web apps, networks, APIs, or responsible disclosure programs.' },
            { icon: '🟢', color: 'var(--green)', title: 'GRC / Security Mgmt', desc: 'Governance, Risk & Compliance. CISO track, auditing, policy, and risk management.' },
            { icon: '🟡', color: 'var(--yellow)', title: 'Security Engineering', desc: 'Build secure systems. DevSecOps, security tooling, AppSec, and secure architecture.' },
          ].map((path) => (
            <div key={path.title}
              style={{
                background: 'var(--surface)', border: '1px solid var(--border)',
                borderTop: `2px solid ${path.color}`,
                padding: '20px 16px', textAlign: 'center', transition: '0.2s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'translateY(-3px)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'none')}
            >
              <div style={{ fontSize: '28px', marginBottom: '10px' }}>{path.icon}</div>
              <div style={{ fontFamily: "'Orbitron', sans-serif", fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', color: path.color, marginBottom: '8px' }}>
                {path.title}
              </div>
              <div style={{ fontSize: '12px', fontWeight: 300, color: 'var(--text)', lineHeight: 1.5 }}>
                {path.desc}
              </div>
            </div>
          ))}
        </div>
      </Phase>

      <footer style={{ textAlign: 'center', marginTop: '60px', paddingTop: '30px', borderTop: '1px solid var(--border)' }}>
        <p style={{ fontFamily: "'Share Tech Mono', monospace", fontSize: '11px', letterSpacing: '3px', opacity: 0.3, textTransform: 'uppercase' }}>
          // cybersecurity roadmap — stay ethical, stay legal, keep learning //
        </p>
      </footer>
    </div>
  )
}
