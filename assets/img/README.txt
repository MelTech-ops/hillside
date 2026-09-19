ALREADY IN THIS FOLDER
----------------------
logo.png              The real badge, background removed, 512x512 transparent.
                      Already wired into every page header. Nothing to do.
favicon.png           64x64, browser tab.
apple-touch-icon.png  180x180, iOS home screen.

(No stand-in artwork any more. Every photo well is an empty labelled panel
 until you drop a real photograph in.)


IMAGES FOR THE HILLSIDE SITE
============================

The site is built photo-first. Every image sits in a "photo well" that shows a
dark green panel with a label until you drop the real file in. Fill them and
the site transforms; leave them and it still looks deliberate.


HOW TO FILL A PHOTO WELL
------------------------
Find the well in the HTML. It looks like this:

    <figure class="ph ph--4x3">
      <!-- Replace with: <img src="assets/img/wings.jpg" alt="Wings and a draft"> -->
      <span>Photo &middot; Wings &amp; a draft<small>800 &times; 600</small></span>
    </figure>

Save the photo into this folder, then swap the <span> line for the <img> line:

    <figure class="ph ph--4x3">
      <img src="assets/img/wings.jpg" alt="Wings and a draft on the bar">
    </figure>

That's it. The image is cropped to fill the well automatically, so the exact
pixel size doesn't have to be perfect - just don't go smaller than listed.


THE SHOT LIST
-------------
index.html
  hero.jpg          1920 x 1080   The bar at night, or a packed room. Wide,
                                  moody, room on the LEFT for the headline.
                                  Save it here, then in assets/css/style.css
                                  find ".hero__photo" and uncomment the
                                  background-image line.
  wings.jpg          800 x 600    Wings and a draft on the bar
  karaoke.jpg        800 x 600    Karaoke night, mic and a crowd
  steak.jpg          800 x 600    The New York strip plate
  room.jpg          2000 x 860    The room, wide - a full bar on a busy night
  brisket.jpg        700 x 700    Goose's smoked brisket
  stuffed-bread.jpg  700 x 700    A stuffed bread, sliced open
  porchetta.jpg      700 x 700    Freeman's porchetta sandwich
  mac.jpg            700 x 700    Cast iron mac and cheese
  bar.jpg            900 x 1200   Behind the bar - PORTRAIT orientation

neighborhood.html
  room-tall.jpg      900 x 1200   Inside the Hillside - PORTRAIT

menu.html
  (wide band)       2000 x 860    The smoker, or a loaded plate

events.html
  (wide band)       2000 x 860    Game day - the bar with the screens on

Sharing / SEO
  og-image.jpg      1200 x 630    What shows when someone shares a link
  favicon.png         64 x 64     Browser tab icon - the badge cropped square

Best source: their own Facebook and Instagram albums. Their Facebook photo grid
has real food shots and the specials flyers.


THE LOGO  -  DONE
-----------------
The real logo is in and working: the circular badge with the starburst edge,
"HILLSIDE" and "CAFE & PUB" arched in green on yellow, "RE EST. 2020" across the
middle, and the beer mug with radiating rays at the center.

It was extracted from the file you sent, squared up, and had its white
background made transparent so it sits cleanly on the dark header.

If you get the original vector artwork later, drop in a cleaner logo.png at
512x512 or larger and it replaces this one with no code changes. The whole site
palette is sampled from this badge: yellow #FAC800, green #3C6432.

Note: until hero.jpg exists, the browser console logs one harmless 404 for it.
That disappears the moment you add the file.
