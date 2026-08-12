import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import content from "../content/site.json";
import type { SiteContent } from "./types";
import "./style.css";

type Lang = "zh" | "en";
const labels = {
  zh: { nav: ["简介", "动态", "论文", "项目", "教学", "经历"], about: "简介", news: "动态", publications: "论文", projects: "项目", teaching: "教学", education: "经历", interests: "研究方向", selected: "代表作", contact: "联系", admin: "管理" },
  en: { nav: ["About", "News", "Publications", "Projects", "Teaching", "Education"], about: "About", news: "News", publications: "Publications", projects: "Projects", teaching: "Teaching", education: "Education", interests: "Research interests", selected: "Selected", contact: "Contact", admin: "Admin" }
};

function App() {
  const [lang, setLang] = useState<Lang>(() => (localStorage.getItem("lang") as Lang) || "zh");
  const data = content as SiteContent;
  const t = labels[lang];
  const pick = (value: { zh: string; en: string }) => value[lang];
  useEffect(() => { document.documentElement.lang = lang === "zh" ? "zh-CN" : "en"; localStorage.setItem("lang", lang); }, [lang]);
  const ids = ["about", "news", "publications", "projects", "teaching", "education"];

  return <>
    <header className="topbar">
      <a className="wordmark" href="#top">{pick(data.profile.name)}</a>
      <nav>{ids.map((id, i) => <a key={id} href={`#${id}`}>{t.nav[i]}</a>)}</nav>
      <div className="actions"><button onClick={() => setLang(lang === "zh" ? "en" : "zh")} aria-label="Switch language">{lang === "zh" ? "EN" : "中文"}</button><a href="admin/">{t.admin}</a></div>
    </header>
    <main id="top">
      <section className="hero" id="about">
        <div className="hero-copy">
          <p className="eyebrow">{pick(data.profile.role)}</p>
          <h1>{pick(data.profile.name)}</h1>
          <p className="affiliation">{pick(data.profile.affiliation)}<br />{pick(data.profile.location)}</p>
          <p className="intro">{pick(data.profile.intro)}</p>
          <div className="profile-links"><a href={`mailto:${data.profile.email}`}>{t.contact}</a>{data.profile.links.map(link => <a key={link.label} href={link.url} target="_blank" rel="noreferrer">{link.label}</a>)}</div>
        </div>
        <aside className="portrait" aria-label="Portrait">
          {data.profile.portrait ? <img src={data.profile.portrait} alt={pick(data.profile.name)} /> : <div className="monogram">{data.profile.name.en.split(" ").map(n => n[0]).join("")}</div>}
          <div className="interest-block"><span>{t.interests}</span>{data.profile.interests.map(item => <p key={item.en}>{pick(item)}</p>)}</div>
        </aside>
      </section>

      <section id="news" className="section"><h2>{t.news}</h2><div className="rows">{data.news.map(item => <div className="row" key={item.date + item.text.en}><time>{item.date}</time><p>{pick(item.text)}</p></div>)}</div></section>
      <section id="publications" className="section"><h2>{t.publications}</h2><div className="publication-list">{data.publications.map(pub => <article className="publication" key={pub.title.en}><div><span className="year">{pub.year}</span>{pub.featured && <span className="tag">{t.selected}</span>}</div><div><h3>{pick(pub.title)}</h3><p>{pub.authors}</p><p className="venue">{pub.venue}</p>{pub.links && <div className="paper-links">{pub.links.map(link => <a href={link.url} key={link.label}>{link.label} ↗</a>)}</div>}</div></article>)}</div></section>
      <section id="projects" className="section"><h2>{t.projects}</h2>{data.projects.map(item => <article className="split-item" key={item.title.en}><div>{item.period}</div><div><h3>{item.url ? <a href={item.url}>{pick(item.title)}</a> : pick(item.title)}</h3><p>{pick(item.description)}</p></div></article>)}</section>
      <section id="teaching" className="section"><h2>{t.teaching}</h2>{data.teaching.map(item => <article className="split-item" key={item.term + item.title.en}><div>{item.term}</div><div><h3>{pick(item.title)}</h3><p>{pick(item.role)}</p></div></article>)}</section>
      <section id="education" className="section"><h2>{t.education}</h2>{data.education.map(item => <article className="split-item" key={item.period}><div>{item.period}</div><div><h3>{pick(item.degree)}</h3><p>{pick(item.institution)}</p></div></article>)}</section>
    </main>
    <footer><span>© {new Date().getFullYear()} {pick(data.profile.name)}</span><a href="#top">↑</a></footer>
  </>;
}

createRoot(document.getElementById("root")!).render(<App />);
