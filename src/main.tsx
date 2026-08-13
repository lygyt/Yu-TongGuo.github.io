import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import content from "../content/site.json";
import type { Localized, SiteContent } from "./types";
import "./style.css";

type Lang = "zh" | "en";
const labels = {
  zh: { openings:"交流合作", bio:"个人简介", news:"最新动态", pub:"学术论文", patents:"发明专利", projects:"研究项目", teaching:"教学与服务", activities:"学术与社会活动", awards:"荣誉奖励", interests:"研究兴趣", selected:"代表作", admin:"管理", email:"邮箱" },
  en: { openings:"Openings", bio:"Biography", news:"News", pub:"Publications", patents:"Patents", projects:"Projects", teaching:"Teaching & Service", activities:"Professional Activities", awards:"Awards", interests:"Research Interests", selected:"Selected", admin:"Admin", email:"Email" }
};

function App() {
  const [lang,setLang]=useState<Lang>(()=>(localStorage.getItem("lang") as Lang)||"zh");
  const data=content as SiteContent; const t=labels[lang]; const pick=(v:Localized)=>v[lang];
  useEffect(()=>{document.documentElement.lang=lang==="zh"?"zh-CN":"en";localStorage.setItem("lang",lang);document.title=`${pick(data.profile.name)} · Academic Homepage`;},[lang]);
  const nav=[['openings',t.openings],['bio',t.bio],['news',t.news],['pub',t.pub],['patents',t.patents],['projects',t.projects],['teaching',t.teaching],['activities',t.activities],['awards',t.awards]];
  return <div className="page" id="top">
    <div className="utility"><button onClick={()=>setLang(lang==='zh'?'en':'zh')}>{lang==='zh'?'English':'中文'}</button><a href="admin/">{t.admin}</a></div>
    <header className="profile">
      <img src={data.profile.portrait} alt={pick(data.profile.name)} />
      <div className="identity"><h1>{pick(data.profile.name)}</h1><h2>{pick(data.profile.role)}</h2><p>{pick(data.profile.affiliation)}</p><p>{pick(data.profile.location)}</p>{data.profile.email&&<p>{t.email}: <a href={`mailto:${data.profile.email}`}>{data.profile.email}</a></p>}<div className="external">{data.profile.links.map(x=><a key={x.label} href={x.url}>{x.label}</a>)}</div></div>
    </header>
    <nav className="section-nav">{nav.map(([id,label])=><a key={id} href={`#${id}`}>{label}</a>)}</nav>
    <section id="openings" className="notice"><strong>{t.openings}:</strong> {pick(data.openings)}</section>
    <Section id="bio" title={t.bio}><p>{pick(data.profile.intro)}</p><p className="interests"><strong>{t.interests}:</strong> {data.profile.interests.map(pick).join(' · ')}</p></Section>
    <Section id="news" title={t.news}><ul className="news">{data.news.map(x=><li key={x.date+x.text.en}><time>{x.date}</time><span>{pick(x.text)}</span></li>)}</ul></Section>
    <Section id="pub" title={t.pub}>
      <ol className="publications">
        {data.publications.map(x => (
          <li key={x.title.en}>
            <div>
              <b>[{x.venue.split(",")[0]}]</b> {x.authors}, “<strong>{pick(x.title)}</strong>,” <em>{x.venue}</em>. {x.featured && <mark>{t.selected}</mark>}
            </div>
            {x.links && <span className="links">{x.links.map(l => <a key={l.label} href={l.url}>[{l.label}]</a>)}</span>}
          </li>
        ))}
      </ol>
    </Section>
    <Section id="patents" title={t.patents}><ul className="entries">{data.patents.map(x=><li key={x.number}><b>{x.year}</b> · {x.inventors}，<strong>“{pick(x.title)}”</strong>，{x.number}。</li>)}</ul></Section>
    <Section id="projects" title={t.projects}><ul className="entries">{data.projects.map(x=><li key={x.title.en}><b>{x.period}</b> · <strong>{x.url?<a href={x.url}>{pick(x.title)}</a>:pick(x.title)}</strong><p>{pick(x.description)}</p></li>)}</ul></Section>
    <Section id="teaching" title={t.teaching}><ul className="entries">{data.teaching.map(x=><li key={x.term+x.title.en}><b>{x.term}</b> · <strong>{pick(x.title)}</strong>，{pick(x.role)}</li>)}</ul></Section>
    <Section id="activities" title={t.activities}><ul className="entries">{data.activities.map(x=><li key={x.year+x.text.en}><b>{x.year}</b> · {pick(x.text)}</li>)}</ul></Section>
    <Section id="awards" title={t.awards}><ul className="entries">{data.awards.map(x=><li key={x.year+x.text.en}><b>{x.year}</b> · {pick(x.text)}</li>)}</ul></Section>
    <footer>© {new Date().getFullYear()} {pick(data.profile.name)} <a href="#top">↑</a></footer>
  </div>;
}
function Section({id,title,children}:{id:string;title:string;children:React.ReactNode}){return <section id={id} className="section"><h2>{title}</h2>{children}</section>}
createRoot(document.getElementById("root")!).render(<App/>);
