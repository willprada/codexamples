import random, os

# Forma sin numpy
tablero = [[0 for x in range(8)] for y in range(8)]
pesos   = [[0 for x in range(8)] for y in range(8)]
# Forma con numpy
# tablero = zeros([8,8])
# pesos   = zeros([8,8])


def buscarPosiciones (pos):
    movs   = [[2,1], [2,-1], [-2,1], [-2,-1]]
    sigPos = list()
    i = 0 # fila
    j = 0 # columna

    for a in range(4):
        for b in range(2):
            i = pos[0] + movs[a][0]
            j = pos[1] + movs[a][1]

            if i>=0 and i<=7 and j>=0 and j<=7:
                sigPos.append( [i,j] )

            movs[a].reverse()

    return sigPos


def validarVisitado(pos):
    i = pos[0]
    j = pos[1]

    return (tablero[i][j] == 1)


def determinarPeso(pos):
    sig = buscarPosiciones(pos)
    pi  = len(sig) #peso inicial

    for i in range(pi):
        if validarVisitado(sig[i]):
            pi -= 1

    return pi


def cargarPesos():
    for i in range(8):
        for j in range(8):
            pesos[i][j] = determinarPeso([i,j])


def actualizarPesos(sig):
    lon = len(sig)
    i = 0
    j = 0

    for l in range(lon):
        i = sig[l][0]
        j = sig[l][1]

        pesos[i][j] = determinarPeso( sig[l] )


def detSigPosiciones(pos):
    aux = buscarPosiciones(pos)
    lon = len(aux)
    sig = list()

    for a in range(lon):
        if not validarVisitado(aux[a]):
            sig.append(aux[a])

    return sig


def detPotencial(sig):
    potPesos = list()
    potSig   = list()
    lon      = len(sig)
    peso     = 0
    mayor    = 0

    for s in range(lon):
        peso = determinarPeso( sig[s] )
        potPesos.append( peso )

        if (mayor < peso):
            mayor = peso

    for s in range(lon):
        if (potPesos[s] >= mayor):
            potSig.append(sig[s])

    return potSig


def calcularPesosFuturo(pot):
    pesosFut = list()
    peso = 0
    pos  = list()
    lonA = len(pot)
    lonB = 0

    for p in range(lonA):
        pos = detSigPosiciones( pot[p] )
        lonB = len(pos)

        for p1 in range(lonB):
            peso += determinarPeso(pos[p1])

        pesosFut.append(peso)
        peso = 0

    return pesosFut


def detMejorPosicion(pesFut):
    posMayor = 0
    lon = len(pesFut)

    for p in range(lon):
        if (pesFut[posMayor]<pesFut[p]):
            posMayor = p

    return posMayor



cargarPesos()
posAct    = [0,0]
posAct[0] = random.randint(0,7)
posAct[1] = random.randint(0,7)
indice    = 0
pesFut    = list()
movHist   = list()

c = 0

while True:
    movHist.append(posAct)
    i = posAct[0]
    j = posAct[1]
    tablero[i][j] = 1
    pesos[i][j]   = 0
    lon = 0

    print("Escaques visitados:")
    for i in range(8):
        print(tablero[i])
    print()
    print("Peso de los escaques:")
    for i in range(8):
        print( pesos[i] )
    print()
    print()

    sig = detSigPosiciones( posAct )
    actualizarPesos(sig)
    potPos = detPotencial(sig)
    lon = len(potPos)

    if lon == 1:
        posAct = potPos[0]
    elif lon > 1:
        pesFut = calcularPesosFuturo(potPos)
        indice = detMejorPosicion(pesFut)
        posAct = potPos[indice]
    else:
        break

lon = len(movHist)

print("Listado de movimientos:")
for m in range(lon):
    print( movHist[m] )
print()

print(str(lon) + " movimientos")
print()
