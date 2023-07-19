const express = require("express");
const marked = require("marked");
const fs = require("fs").promises;
const path = require("path");
const moment = require("moment");
const hljs = require("highlight.js");
const gm = require("gray-matter");
const htmlToText = require("html-to-text");
const Filter = require("./util/bad-words/lib/index.js");
const striptags = require("striptags");
const promMid = require("express-prometheus-middleware");

require("ejs");

marked.setOptions({
    renderer: new marked.Renderer(),
    highlight: (code, lang) => hljs.highlightAuto(code, [lang]).value,
    headerIds: true,
    gfm: true
});

let previewCache = null;
let previewCacheAlt = null;

const buildPostCache = async()=>{
    try{
        const ls = await fs.readdir("./posts");

        let posts = [];
        let postsAlt = [];

        for (const f of ls){
            try{
                posts.push(await readPost(f.slice(0,-3),true));
            }
        }
    }
}