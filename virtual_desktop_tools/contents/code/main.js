/*
*   Copyright (c) 2019 Daniël Cox <danielcox16@gmail.com>
*
*   This program is free software; you can redistribute it and/or modify
*   it under the terms of the GNU Lesser General Public License as published by
*   the Free Software Foundation; either version 3.0 of the License, or
*   (at your option) any later version.
*
*   This program is distributed in the hope that it will be useful,
*   but WITHOUT ANY WARRANTY; without even the implied warranty of
*   MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*   GNU General Public License for more details.
*/



/* n is the relative desktop number to swap to */
function swapDesktop(n)
{
	var newdesktop = workspace.currentDesktop + n;              /* Desktop index of desktop to swap to */
	
	if (newdesktop >= 1 && newdesktop <= workspace.desktops)
	{
		workspace.clientList().forEach(                         /* Loop over all windows */
			function(w, i) {
				
				if (w.desktop == workspace.currentDesktop)    	/* If on current */
					w.desktop = newdesktop;                     /* Swap window to new */
				else if (w.desktop == newdesktop)          		/* If on new */
					w.desktop = workspace.currentDesktop;       /* Swap window to current */
			}
		);
		workspace.currentDesktop = newdesktop;
	}
	else if (newdesktop == 0)
	{
		workspace.desktops++;                                   /* Add extra desktop */
		workspace.clientList().forEach((w, i) => {
				if (w.desktop > 1)
					w.desktop++;                                /* Move all windows forward except from first first desktop */    
			}
		);
		
	}
	else if (newdesktop == workspace.desktops + 1)
	{
		workspace.desktops++;                                   /* Add extra desktop */
		
		workspace.clientList().forEach((w, i) => {
				if (w.desktop == workspace.currentDesktop)
					w.desktop = newdesktop;                     /* Move windows from current desktop to new one */
			}
		);
		workspace.currentDesktop = newdesktop;
	}
}



function delay(milliseconds, callbackFunc)
{
    var timer = new QTimer();
    timer.timeout.connect(() => {
        timer.stop();
        callbackFunc();
    });
    timer.start(milliseconds);
    return timer;
}



/* Add a desktop before or after current one */
/* addafter adds after current desktop if true, before if false */
function addDesktop(addafter)
{
	/* Add new desktop */
	workspace.desktops++;

	/* switch to new desktop if added after current one */
	if(addafter)
		workspace.currentDesktop++;
	/* if add before stay at current desktop (will be a new one) */
}



/* Remove current desktop */
function removeDesktop()
{
	/* do nothing if only one desktop */
	if(workspace.desktops == 1)
		return;

	workspace.clientList().forEach((w, i) => {
			if (w.desktop == workspace.currentDesktop)	/* If window on desktop that will be removed */
				w.desktop--;							/* Move window to previous desktop */
		}
	);

	workspace.currentDesktop--;							/* move to previous desktop */
	delay(1000, () => {
		workspace.desktops--;								/* remove desktop */
	});
}




if (registerShortcut) {                                         /* Check if the register function actually exists */
	
	registerShortcut("Swap with Next Desktop",                  /* Register shortcut for 'swap with next desktop' */
					 "DESKTOPS: Swap current desktop with next one.",
					 "Meta+Shift+Alt+Right",
					 function() {swapDesktop(1);});
	
	registerShortcut("Swap with Previous Desktop",              /* Register shortcut for 'swap with previous desktop' */
					 "DESKTOPS: Swap current desktop with previous one.",
					 "Meta+Shift+Alt+Left",
					 function() {swapDesktop(-1);});

	registerShortcut("Swap with Above Desktop",                 /* Register shortcut for 'swap with above desktop' */
					 "DESKTOPS: Swap current desktop with one above.",
					 "Meta+Shift+Alt+Up",
					 function() {swapDesktop(-workspace.desktopGridWidth);});
	
	registerShortcut("Swap with Below Desktop",                 /* Register shortcut for 'swap with below desktop' */
					 "DESKTOPS: Swap current desktop with one below.",
					 "Meta+Shift+Alt+Down",
					 function() {swapDesktop(workspace.desktopGridWidth);});
	
	registerShortcut("Add Desktop Before",                             /* Register shortcut for 'add desktop' */
					 "DESKTOPS: Add new desktop before current one.",
					 "Meta+Alt+)",
					 function() {addDesktop(false);});
	
	registerShortcut("Add Desktop After",                             /* Register shortcut for 'add desktop' */
					 "DESKTOPS: Add new desktop after current one.",
					 "Meta+Alt++",
					 function() {addDesktop(true);});

	registerShortcut("Remove Desktop",                          /* Register shortcut for 'insert desktop' */
					 "DESKTOPS: Remove current desktop and move its windows to the next.",
					 "Meta+Alt+_",
					 function() {removeDesktop();});
}
