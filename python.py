tab=[0]*26
tab_1=[0]*26
tab[8]=2
tab[5]=1
tab[2]=-3
tab[1]=4
tab[0]=-1
tab_1[4]=1
tab_1[1]=2
tab_1[0]=-1
n = 8
n_1 = 4
tab_Q=[0]*26
for i in range (n-n_1,-1,-1) :
    tab_Q[i]+=tab[i+n_1]
    for j in range(n_1-1,-1,-1) :
        if (i+1+n_1-1-j<n-n_1) :
            tab_Q[i]+=(tab_Q[i+1+n_1-1-j]*(-tab_1[j]))
print(tab_Q)