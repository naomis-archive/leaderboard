import { assert } from "chai";
import { PostsOrPages } from "@tryghost/content-api";
import { compileNewsData } from "../../controllers/news/modules/compileNewsData";
import { NewsContribInt } from "../../interfaces/news/NewsContribInt";

const mockNewsData = [
  {
    id: "60427617a7946308b7682a8e",
    uuid: "aa3919dc-b1ae-447e-91de-23000b29c8a7",
    title:
      "PowerShell Themes and Windows Terminal Color Schemes – How to Customize Your Command Line",
    slug: "windows-terminal-themes-color-schemes-powershell-customize",
    html: "haha",
    comment_id: "60427617a7946308b7682a8e",
    feature_image:
      "https://www.freecodecamp.org/news/content/images/2021/03/header-1.png",
    featured: false,
    created_at: "2021-03-05T13:19:03.000-05:00",
    updated_at: "2021-03-05T20:39:57.000-05:00",
    published_at: "2021-03-05T20:39:57.000-05:00",
    codeinjection_head: null,
    codeinjection_foot: null,
    custom_template: null,
    canonical_url: null,
    authors: [
      {
        id: "5fd3a6dfe6787e098393da09",
        name: "Nicholas Carrigan",
        slug: "nhcarrigantest",
        profile_image:
          "https://www.freecodecamp.org/news/content/images/2020/12/profile.jpg",
        cover_image: null,
        bio: null,
        website: "https://www.nhcarrigan.com",
        location: "Vancouver, Washington",
        facebook: "nhcarrigan",
        twitter: "@nhcarrigan",
        meta_title: null,
        meta_description: null,
        url: "https://www.freecodecamp.org/news/author/nhcarrigan/",
      },
    ],
    primary_author: {
      id: "5fd3a6dfe6787e098393da09",
      name: "Nicholas Carrigan",
      slug: "nhcarrigantest",
      profile_image:
        "https://www.freecodecamp.org/news/content/images/2020/12/profile.jpg",
      cover_image: null,
      bio: null,
      website: "https://www.nhcarrigan.com",
      location: "Vancouver, Washington",
      facebook: "nhcarrigan",
      twitter: "@nhcarrigan",
      meta_title: null,
      meta_description: null,
      url: "https://www.freecodecamp.org/news/author/nhcarrigan/",
    },
    url: "https://www.freecodecamp.org/news/windows-terminal-themes-color-schemes-powershell-customize/",
    excerpt:
      "I recently set up and configured Windows Terminal for my local development\nenvironment. In this article, I will walk you through the steps to configure\nyour own Terminal.\n\nIf you have not done so already, you can download Windows Terminal from the\nMicrosoft Store [https://aka.ms/terminal] if you are on Windows 10. Windows\nTerminal is not available on earlier versions of Windows.\n\nHow to Configure your PowerShell Selections\nImage demonstrating the multi-tab functionality offered by Windows Termin",
    reading_time: 9,
    og_image: null,
    og_title: null,
    og_description: null,
    twitter_image: null,
    twitter_title: null,
    twitter_description: null,
    meta_title: null,
    meta_description: null,
  },
  {
    id: "60427617a7946308b7682a8e",
    uuid: "aa3919dc-b1ae-447e-91de-23000b29c8a7",
    title:
      "PowerShell Themes and Windows Terminal Color Schemes – How to Customize Your Command Line",
    slug: "windows-terminal-themes-color-schemes-powershell-customize",
    html: "haha",
    comment_id: "60427617a7946308b7682a8e",
    feature_image:
      "https://www.freecodecamp.org/news/content/images/2021/03/header-1.png",
    featured: false,
    created_at: "2021-03-05T13:19:03.000-05:00",
    updated_at: "2021-03-05T20:39:57.000-05:00",
    published_at: "2021-03-05T20:39:57.000-05:00",
    codeinjection_head: null,
    codeinjection_foot: null,
    custom_template: null,
    canonical_url: null,
    authors: [
      {
        id: "5fd3a6dfe6787e098393da09",
        name: "Nicholas Carrigan",
        slug: "nhcarrigantest",
        profile_image:
          "https://www.freecodecamp.org/news/content/images/2020/12/profile.jpg",
        cover_image: null,
        bio: null,
        website: "https://www.nhcarrigan.com",
        location: "Vancouver, Washington",
        facebook: "nhcarrigan",
        twitter: "@nhcarrigan",
        meta_title: null,
        meta_description: null,
        url: "https://www.freecodecamp.org/news/author/nhcarrigan/",
      },
    ],
    primary_author: {
      id: "5fd3a6dfe6787e098393da09",
      name: "Nicholas Carrigan",
      slug: "nhcarrigan",
      profile_image:
        "https://www.freecodecamp.org/news/content/images/2020/12/profile.jpg",
      cover_image: null,
      bio: null,
      website: "https://www.nhcarrigan.com",
      location: "Vancouver, Washington",
      facebook: "nhcarrigan",
      twitter: "@nhcarrigan",
      meta_title: null,
      meta_description: null,
      url: "https://www.freecodecamp.org/news/author/nhcarrigan/",
    },
    url: "https://www.freecodecamp.org/news/windows-terminal-themes-color-schemes-powershell-customize/",
    excerpt:
      "I recently set up and configured Windows Terminal for my local development\nenvironment. In this article, I will walk you through the steps to configure\nyour own Terminal.\n\nIf you have not done so already, you can download Windows Terminal from the\nMicrosoft Store [https://aka.ms/terminal] if you are on Windows 10. Windows\nTerminal is not available on earlier versions of Windows.\n\nHow to Configure your PowerShell Selections\nImage demonstrating the multi-tab functionality offered by Windows Termin",
    reading_time: 9,
    og_image: null,
    og_title: null,
    og_description: null,
    twitter_image: null,
    twitter_title: null,
    twitter_description: null,
    meta_title: null,
    meta_description: null,
  },
];

const expectedResult: NewsContribInt[] = [
  {
    name: "Nicholas Carrigan",
    username: "nhcarrigantest",
    url: "https://www.freecodecamp.org/news/author/nhcarrigan/",
    avatar:
      "https://www.freecodecamp.org/news/content/images/2020/12/profile.jpg",
    posts: 1,
  },
];

suite("News modules", () => {
  test("should parse data correctly", async () => {
    const result = await compileNewsData(mockNewsData as PostsOrPages);
    assert.deepEqual(
      result[0],
      expectedResult[0],
      "did not parse data correctly"
    );
  });

  test("should filter out staff data", async () => {
    const result = await compileNewsData(mockNewsData as PostsOrPages);
    const staff = result.find((el) => el.username === "nhcarrigan");
    assert.isUndefined(staff, "did not filter out staff data");
  });
});
