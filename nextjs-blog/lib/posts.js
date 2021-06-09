import fs from "fs";
import path from "path";
import matter from "gray-matter";

const postsDirectory = path.join(process.cwd(), "posts");

export function getSortedPostsData() {
  // 获取所有文件
  const fileNames = fs.readdirSync(postsDirectory);

  const allPostsData = fileNames.map((fileName) => {
    // 获取文件名
    const id = fileName.replace(/\.md$/, "");

    // 读取文件路径和文件内容
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, "utf-8");

    // 使用gray-matter解析文件内容
    const matterResult = matter(fileContents);

    return {
      id,
      ...matterResult.data,
    };
  });

  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllPostIds() {
  const fileNames = fs.readdirSync(postsDirectory);

  return fileNames.map((fileName) => {
    return {
      params: {
        id: fileName.replace(/\.md$/, ""),
      },
    };
  });
}

export function getPostData(id) {
  // 读取文件路径和文件内容
  const fullPath = path.join(postsDirectory, `${id}.md`);
  const fileContents = fs.readFileSync(fullPath, "utf-8");

  // 使用gray-matter解析文件内容
  const matterResult = matter(fileContents);

  return {
    id,
    ...matterResult.data,
  }
  
}